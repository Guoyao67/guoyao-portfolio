import './App.css'
import { useRef, useState } from 'react'
import Guestbook from './Guestbook'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  const links = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#beyond', label: 'Beyond Code' },
    { href: '#contact', label: 'Contact' },
  ]

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu()
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className="navbar" onKeyDown={handleKeyDown}>
      <a className="logo" href="#home" onClick={closeMenu}>
        Guoyao<span>.</span>
      </a>

      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '关闭 ✕' : '菜单 ☰'}
      </button>

      <nav
        id="main-navigation"
        className={`nav-links ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function ProfileCard() {
  return (
    <aside className="profile-card" aria-labelledby="profile-name">
      <div className="profile-card-top">
        <span>PLAYER PROFILE</span>
        <span className="profile-sparkle" aria-hidden="true">✦</span>
      </div>

      <div className="profile-avatar">
        <img
          className="profile-avatar"
          src={`${import.meta.env.BASE_URL}GuoyaoHu.png`}
          alt="Guoyao 的头像"
          width="160"
          height="160"
        />
      </div>

      <p className="profile-label">DEVELOPER IN PROGRESS</p>
      <h2 id="profile-name">Guoyao</h2>
      <p className="profile-subtitle">好奇心驱动，持续探索中。</p>

      <dl className="profile-facts">
        <div>
          <dt>BASE</dt>
          <dd>Sydney, Australia</dd>
        </div>
        <div>
          <dt>STUDY</dt>
          <dd>Computer Science @ UNSW</dd>
        </div>
        <div>
          <dt>FOCUS</dt>
          <dd>Software Development & AI</dd>
        </div>
      </dl>

      <div className="profile-quest">
        <span className="quest-dot" aria-hidden="true" />
          <p>
            <span>
              当前任务：打造我的个人作品集
            <br />
              寻找软件开发 / AI 相关实习
            </span>
          </p>
      </div>
    </aside>
  )
}

function Hero() {
  return (
    <section id="home" className="hero hero-profile">
      <div className="hero-copy">
        <p className="eyebrow">COMPUTER SCIENCE · UNSW SYDNEY</p>

        <h1>
          Hi, I’m Guoyao.
          <br />
          <span>Turning curiosity into code.</span>
        </h1>

        <p className="intro">
          计算机专业学生，正在探索软件开发与人工智能。
          在这里，记录我的项目、思考，以及代码之外的生活。
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#projects">
            探索我的项目 ↗
          </a>

          <a className="secondary-button" href="#about">
            关于我 ↓
          </a>
        </div>

        <p className="hero-note">
          <span aria-hidden="true">✦</span>
          Stay curious. Keep building.
        </p>
      </div>

      <ProfileCard />
    </section>
  )
}

const projects = [
  {
    id: 'day-and-night',
    demoUrl: 'https://guoyao67.github.io/day-night/',
    sourceUrl: 'https://github.com/Guoyao67/day-night',
    number: '01',
    title: 'Day and Night',
    category: 'PERSONAL WEBSITE',
    cover: 'day-night',
    image: `${import.meta.env.BASE_URL}day-and-night.png`,
    symbol: '☾',
    coverText: 'Between light & dark.',
    description: '使用 HTML、CSS 和 JavaScript 构建的昼夜主题网页，探索场景设计与交互效果。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    detail: '从页面布局到视觉样式，再到 JavaScript 交互，将昼夜变化的想法转化为可以体验的网页。下方提供在线演示和项目源码。',
  },
  {
    id: 'xecaps',
    number: '02',
    title: 'Xecaps Mission Control',
    category: 'TEAM PROJECT · COMP1531',
    cover: 'portfolio',
    image: `${import.meta.env.BASE_URL}xecaps-cover.png`,
    imageAlt: 'Xecaps 太空任务管理项目主题插画',
    symbol: '</>',
    coverText: 'Building as a team.',
    description:
      '参与太空任务管理平台的后端开发，在课程团队项目中实践软件工程与协作。',
    tags: ['JavaScript', 'TypeScript','Node.js', 'Express', 'REST API', 'Git / GitLab',],
    detail:
      'COMP1531软件工程团队项目，围绕太空任务管理平台开展后端开发。团队将各模块的函数大致平均分配，我参与了多个模块的实现，负责其中分配给我的函数，并与队友协作完成各阶段的开发。',
  },
  {
    id: 'ai-coursework',
      number: '03',
    title: 'AI Search & Machine Learning',
    category: 'COURSE PROJECT · COMP3411',
    cover: 'ai-search',
    image: `${import.meta.env.BASE_URL}ai-project-cover.png`,
    imageAlt: '汉诺塔搜索、决策树与集成学习主题插画',
    symbol: '◎',
    coverText: 'Search, learn, discover.',
    description:
      '使用 Python 实践搜索算法、决策树与集成学习，探索 AI 如何寻找解并从数据中学习。',
    tags: [
      'Python',
      'Search Algorithms',
      'IDA*',
      'Decision Trees',
      'Bagging',
      'Model Evaluation',
    ],
    detail:
      'COMP3411 人工智能课程项目，包含搜索与机器学习两部分。搜索部分围绕汉诺塔问题，实现深度受限搜索（DLS）、迭代加深搜索（IDS）和 IDA*，分析不同方法的搜索效率。机器学习部分探索决策树与 Bagging，通过实验比较不同树深度和集成规模的表现，思考预测能力与可解释性之间的取舍。',
  },
]

function FeaturedProjects() {
  return (
    <section id="projects" className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>Featured Projects</h2>
        </div>

        <p className="section-caption">
          从想法到实现，每个项目都是一次探索。
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className={`project-cover ${project.cover}`}>
              {project.image ? (
                <img
                  className="project-preview"
                  src={project.image}
                  alt={project.imageAlt || `${project.title} 网站截图`}
                  loading="lazy"
                />
              ) : (
                <>
                  <span className="cover-number" aria-hidden="true">
                    {project.number}
                  </span>
                  <span className="cover-symbol" aria-hidden="true">
                    {project.symbol}
                  </span>
                  <span className="cover-text" aria-hidden="true">
                    {project.coverText}
                  </span>
                </>
              )}
            </div>

            <div className="project-body">
              <p className="project-category">{project.category}</p>

              <h3>{project.title}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <ul className="project-tags" aria-label="Project topics">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <details className="project-details">
                <summary>项目介绍</summary>
                <p>{project.detail}</p>
              </details>

              {(project.demoUrl || project.sourceUrl) && (
                <div className="project-links">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      体验网站 ↗
                    </a>
                  )}

                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      查看源码 ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutMe() {
  return (
    <section id="about" className="content-section">
      <div className="about-grid">
        <div>
          <p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p>
          <h2>About Me</h2>

          <h3 className="about-statement">
            保持好奇，
            <br />
            <span>在实践中寻找答案。</span>
          </h3>
        </div>

        <div className="about-copy">
          <p>
            我是 Guoyao，目前在悉尼 UNSW 就读计算机科学本科，
            处于大二第二学期，专业方向是人工智能。
            我对软件开发和 AI 应用感兴趣，希望把课堂上学到的知识，
            逐步变成能够解决实际问题的项目。
          </p>

          <p>
            我的学习从 C 语言编程开始，逐渐延伸到计算机系统、
            数据结构与算法，以及软件工程。
            在团队项目中，我参与了后端功能开发，使用 Git 与队友协作；
            在人工智能课程中，我通过 Python 实践搜索算法、
            决策树与集成学习，理解不同方法的特点与取舍。
          </p>

          <p>
            目前，我正在继续学习 Java 面向对象设计和人工智能，
            也通过这个 React 作品集练习前端开发。
            我希望记录的不只是最后的成果，还有从理解问题、
            调试代码到逐步改进的过程。目前正在寻找实习机会，
            期待参与真实项目，在实践与合作中继续成长。
          </p>

          <details className="about-courses">
            <summary>相关课程与学习背景</summary>

            <h3>学习过的课程</h3>
            <ul>
              <li>COMP1511 · 编程基础</li>
              <li>COMP1521 · 计算机系统基础</li>
              <li>COMP1531 · 软件工程基础</li>
              <li>COMP2521 · 数据结构与算法</li>
              <li>COMP2041 · 软件构建</li>
              <li>MATH1131 / MATH1231 · 数学基础</li>
              <li>MATH1081 · 离散数学</li>
            </ul>

            <h3>目前在学</h3>
            <ul>
              <li>COMP2511 · 面向对象设计与编程</li>
              <li>COMP3411 · 人工智能</li>
              <li>COMP4920 · 计算机职业与伦理议题</li>
            </ul>
          </details>

          <a className="text-link" href="#skills">
            看看我正在使用的技术 ↓
          </a>
        </div>
      </div>
    </section>
  )
}

const skillGroups = [
  {
    number: '01',
    title: 'Programming',
    subtitle: '编程语言',
    skills: [
      'C',
      'Python',
      'Java',
      'JavaScript',
      'TypeScript',
      'Shell',
    ],
    description:
      '通过课程与项目练习程序设计、数据结构和算法，使用不同语言完成后端功能、脚本任务与 AI 实验。',
  },
  {
    number: '02',
    title: 'Frontend Development',
    subtitle: '前端开发 · 持续学习中',
    skills: ['React', 'HTML', 'CSS', 'Vite'],
    description:
      '使用 React 组织页面组件，通过 CSS 实现布局、响应式适配和交互效果，并在个人作品集中持续实践。',
  },
  {
    number: '03',
    title: 'Backend Development',
    subtitle: '后端开发与接口',
    skills: ['Node.js', 'Express', 'REST API'],
    description:
      '在团队项目中参与后端函数与接口实现，练习请求处理、输入检查，以及前后端之间的数据交互。',
  },
  {
    number: '04',
    title: 'AI & Algorithms',
    subtitle: '人工智能与算法',
    skills: [
      'Search Algorithms',
      'Decision Trees',
      'Bagging',
      'Model Evaluation',
    ],
    description:
      '使用 Python 实践搜索与分类任务，通过实验比较算法效率、模型表现及不同方案的取舍。',
  },
  {
    number: '05',
    title: 'Tools & Workflow',
    subtitle: '开发工具与协作流程',
    skills: [
      'Git',
      'GitHub',
      'GitLab',
      'Linux / WSL',
      'VS Code',
      'JUnit',
    ],
    description:
      '使用 Git 管理代码版本，通过 GitLab 参与团队协作，在 Linux 环境中运行项目，并结合调试和测试定位问题。',
  },
]

function Skills() {
  return (
    <section id="skills" className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / MY TOOLKIT</p>
          <h2>Skills</h2>
        </div>

        <p className="section-caption">
          在课程中建立基础，在项目中继续练习。
        </p>
      </div>

      <div className="skills-list">
        {skillGroups.map((group) => (
          <article className="skill-row" key={group.number}>
            <div className="skill-heading">
              <span className="skill-number" aria-hidden="true">
                {group.number}
              </span>

              <div>
                <h3>{group.title}</h3>
                <p>{group.subtitle}</p>
              </div>
            </div>

            <div className="skill-content">
              <ul className="skill-tags" aria-label={group.title}>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <p>{group.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const interests = [
  {
    id: 'films',
    symbol: '◉',
    title: 'Films & Stories',
    subtitle: '“与自己如此疏离，却又如此真切地存在于世界之中。”',
    description:
      '——《超脱》片头引言 · 加缪',
  },
  {
    id: 'music',
    symbol: '♫',
    title: 'Music & Moments',
    subtitle: '王菲 ·《笑忘书》',
    description:
      '喜欢王菲的《笑忘书》。在学习与生活的间隙，留一点时间给音乐，也留给自己。',
  },
  {
    id: 'fitness',
    symbol: '💪',
    title: 'Fitness & Growth',
    subtitle: '在一次次训练中，积累改变。',
    description:
      '学习之外，我也喜欢去健身房。从力量训练开始，慢慢提升体能，也让自己暂时放下代码，专注于身体和当下。',
  },
]

function BeyondCode() {
  return (
    <section id="beyond" className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / OFF THE SCREEN</p>
          <h2>Beyond Code</h2>
        </div>

        <p className="section-caption">
          代码之外，还有让我保持好奇的事。
        </p>
      </div>

      <div className="interests-grid">
        {interests.map((interest) => (
          <article className="interest-item" key={interest.id}>
            <span className="interest-symbol" aria-hidden="true">
              {interest.symbol}
            </span>

            <h3>{interest.title}</h3>
            {interest.title === 'Films & Stories' && (
              <img
                className="film-poster"
                src={`${import.meta.env.BASE_URL}Detachment.jpg`}
                alt="《超脱》电影海报"
                loading="lazy"
              />
            )}
            {interest.title === 'Music & Moments' && (
              <img
                className="album-cover"
                src={`${import.meta.env.BASE_URL}faye-wong-fable.jpg`}
                alt="王菲《寓言》专辑封面"
                width="160"
                height="160"
                loading="lazy"
              />
            )}
            {interest.id === 'fitness' && (
              <img
                className="fitness-photo"
                src={`${import.meta.env.BASE_URL}Fitness.jpg`}
                alt="我的健身照片"
                width="160"
                height="160"
                loading="lazy"
              />
            )}
            <p className="interest-subtitle">{interest.subtitle}</p>
            <p className="interest-description">
              {interest.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

// 在引号里填写你愿意公开的联系方式；留空则不显示对应链接。
const contactInfo = {
  email: 'z5629119@ad.unsw.edu.au',
  github: 'https://github.com/Guoyao67',
}

function Contact() {
  const hasContact = contactInfo.email || contactInfo.github

  return (
    <section id="contact" className="content-section contact-section">
      <div className="contact-panel">
        <p className="eyebrow">05 / SAY HELLO</p>

        <h2>
          Let’s build
          <br />
          <span>something meaningful.</span>
        </h2>

        <p className="contact-copy">
          欢迎交流项目、学习心得，也期待实习与合作的机会。
        </p>

        {hasContact ? (
          <div className="contact-actions">
            {contactInfo.email && (
              <a
                className="primary-button"
                href={`mailto:${contactInfo.email}`}
              >
                邮件联系 ↗
              </a>
            )}

            {contactInfo.github && (
              <a
                className="secondary-button"
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            )}
          </div>
        ) : (
          <p className="contact-pending">联系方式即将补充。</p>
        )}

        {contactInfo.email && (
          <p className="contact-email">{contactInfo.email}</p>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="logo" href="#home">
        Guoyao<span>.</span>
      </a>

      <p>© {new Date().getFullYear()} Guoyao · Built with curiosity.</p>

      <a className="back-to-top" href="#home">
        回到顶部 ↑
      </a>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedProjects />
        <AboutMe />
        <Skills />
        <BeyondCode />
        <Contact />
        <Guestbook />
      </main>

      <Footer />
    </>
  )
}

export default App