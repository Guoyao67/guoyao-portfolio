import { useEffect, useRef, useState } from 'react'
import { supabase } from './supabase'

const PAGE_SIZE = 20

export default function Guestbook() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [notice, setNotice] = useState('')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [refresh, setRefresh] = useState(0)
  const sendingRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function loadMessages() {
      setLoading(true)
      setLoadError('')

      try {
        const { data, count, error } = await supabase
          .from('guestbook_messages')
          .select('id, author_name, content, created_at', {
            count: 'exact',
          })
          .order('created_at', { ascending: true })
          .order('id', { ascending: true })
          .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

        if (error) throw error
        if (cancelled) return

        const lastPage = Math.max(
          0,
          Math.ceil((count ?? 0) / PAGE_SIZE) - 1,
        )

        if (page > lastPage) {
          setPage(lastPage)
          return
        }

        setMessages(data ?? [])
        setTotal(count ?? 0)
      } catch (error) {
        console.error('读取留言失败：', error)

        if (!cancelled) {
          setLoadError('留言加载失败，请点击重新加载。')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadMessages()

    return () => {
      cancelled = true
    }
  }, [page, refresh])

  async function handleSubmit(event) {
    event.preventDefault()
    if (sendingRef.current) return

    setSubmitError('')
    setNotice('')

    const cleanName = name.trim()
    const cleanContent = content.trim()

    if (!cleanName || !cleanContent) {
      setSubmitError('请填写署名和留言，不能只输入空格。')
      return
    }

    sendingRef.current = true
    setSending(true)

    try {
      const { error } = await supabase.rpc(
        'submit_guestbook_message',
        {
          p_author_name: cleanName,
          p_content: cleanContent,
        },
      )

      if (error) throw error
    } catch (error) {
      console.error('提交留言失败：', error)

      setSubmitError(
        error.code === 'P0001'
          ? error.message
          : '未能确认提交结果，请先刷新查看留言是否已保存，再决定是否重试。',
      )

      sendingRef.current = false
      setSending(false)
      return
    }

    // 已确认保存成功，再刷新列表
    setContent('')
    setNotice('留言已发布，谢谢你留下的文字！')

    try {
      const { count, error } = await supabase
        .from('guestbook_messages')
        .select('id', { count: 'exact', head: true })

      if (error) throw error

      // 跳到最后一页，方便看到刚发布的留言
      setPage(Math.max(0, Math.ceil((count ?? 0) / PAGE_SIZE) - 1))
    } catch {
      setNotice('留言已保存。暂时无法定位最新一页，请稍后刷新查看。')
    } finally {
      setRefresh((value) => value + 1)
      sendingRef.current = false
      setSending(false)
    }
  }

  return (
    <section
      id="guestbook"
      className="content-section guestbook"
      aria-labelledby="guestbook-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">06 / LEAVE A TRACE</p>
          <h2 id="guestbook-title">Guestbook</h2>
        </div>

        <p className="section-caption">
          很高兴你来过，留下一点想说的话吧。
        </p>
      </div>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <label htmlFor="guestbook-name">你的署名</label>
        <input
          id="guestbook-name"
          type="text"
          autoComplete="nickname"
          placeholder="怎么称呼你？"
          maxLength={30}
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={sending}
        />

        <label htmlFor="guestbook-content">想说的话</label>
        <textarea
          id="guestbook-content"
          rows={5}
          placeholder="聊聊项目、电影、音乐，或者简单打个招呼…"
          maxLength={100}
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={sending}
          aria-describedby="guestbook-public-note"
        />

        <div className="guestbook-form-footer">
          <span>{content.length} / 100</span>
          <button type="submit" disabled={sending}>
            {sending ? '正在发布…' : '留下留言 ↗'}
          </button>
        </div>

        <p id="guestbook-public-note" className="guestbook-hint">
          署名和留言会公开显示，请勿填写私人联系方式。
        </p>

        {submitError && (
          <p className="guestbook-error" role="alert">
            {submitError}
          </p>
        )}

        <p className="guestbook-success" role="status">
          {notice}
        </p>
      </form>

      <div className="guestbook-toolbar">
        <h3>留言楼</h3>
        <button
          type="button"
          disabled={loading || sending}
          onClick={() => setRefresh((value) => value + 1)}
        >
          {loading ? '加载中…' : '刷新留言'}
        </button>
      </div>

      {loading ? (
        <p className="guestbook-notice" role="status">
          正在加载留言…
        </p>
      ) : loadError ? (
        <div role="alert">
          <p className="guestbook-error">{loadError}</p>
          <button
            type="button"
            onClick={() => setRefresh((value) => value + 1)}
          >
            重新加载
          </button>
        </div>
      ) : messages.length === 0 ? (
        <div className="guestbook-empty">
          <span aria-hidden="true">✦</span>
          <h3>这里，等待第一段交流。</h3>
          <p>成为第一个留言的人吧。</p>
        </div>
      ) : (
        <div className="guestbook-list">
          {messages.map((message) => (
            <article className="guestbook-message" key={message.id}>
              <div className="guestbook-message-heading">
                <div>
                  <span className="guestbook-floor">
                    #{message.id}
                  </span>
                  <strong>{message.author_name}</strong>
                </div>

                <time dateTime={message.created_at}>
                  {new Date(message.created_at).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>

              <p className="guestbook-message-content">
                {message.content}
              </p>
            </article>
          ))}
        </div>
      )}

      {!loadError && total > PAGE_SIZE && (
        <nav className="guestbook-pagination" aria-label="留言分页">
          <button
            type="button"
            disabled={page === 0 || loading || sending}
            onClick={() => setPage((value) => value - 1)}
          >
            上一页
          </button>

          <span>
            {page + 1} / {Math.ceil(total / PAGE_SIZE)}
          </span>

          <button
            type="button"
            disabled={
              (page + 1) * PAGE_SIZE >= total || loading || sending
            }
            onClick={() => setPage((value) => value + 1)}
          >
            下一页
          </button>
        </nav>
      )}
    </section>
  )
}