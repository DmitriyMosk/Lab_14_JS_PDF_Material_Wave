import '../css/style.css';
import { setupResumeEditor } from './counter.js';

document.querySelector('#app').innerHTML = `
  <main class="page">
    <section class="toolbar" aria-label="Управление резюме">
      <div>
        <p class="toolbar__eyebrow">Lab 14 · Bento Resume</p>
        <p class="toolbar__hint">Нажми на любой текст, чтобы изменить его. Клик по фото позволяет выбрать изображение с компьютера. Изменения сохраняются после обновления страницы.</p>
      </div>
      <div class="toolbar__actions">
        <button class="action-btn ripple-target" id="reset-resume" type="button">Сбросить</button>
        <button class="action-btn action-btn--primary ripple-target" id="download-pdf" type="button">Скачать PDF</button>
      </div>
    </section>

    <article class="resume-shell" aria-label="Интерактивное резюме">
      <section class="resume-grid">
        <section class="card photo-card ripple-target" aria-label="Фото профиля">
          <div class="photo-card__image" data-avatar title="Нажми, чтобы выбрать фотографию">KS</div>
          <input class="visually-hidden" id="avatar-input" type="file" accept="image/*" />
        </section>

        <section class="card intro-card ripple-target">
          <p class="intro-card__greeting editable" data-edit-key="greeting">Hello 👋 I’m</p>
          <div>
            <h1 class="intro-card__name editable" data-edit-key="fullName">Karthik SR</h1>
            <p class="intro-card__role editable" data-edit-key="role">UX/UI Designer</p>
          </div>
        </section>

        <section class="card languages-card ripple-target card-span-2">
          <h2 class="card-title">Languages</h2>
          <div class="language-list">
            <div class="language-row">
              <span class="editable" data-edit-key="lang1Name">English</span>
              <div class="language-controls">
                <div class="language-bar ripple-target" data-level-track="lang1Level" title="Нажми по шкале, чтобы изменить уровень">
                  <span data-level-bar="lang1Level"></span>
                </div>
                <span class="language-value" data-level-value="lang1Level"></span>
              </div>
            </div>
            <div class="language-row">
              <span class="editable" data-edit-key="lang2Name">Malayalam</span>
              <div class="language-controls">
                <div class="language-bar ripple-target" data-level-track="lang2Level" title="Нажми по шкале, чтобы изменить уровень">
                  <span data-level-bar="lang2Level"></span>
                </div>
                <span class="language-value" data-level-value="lang2Level"></span>
              </div>
            </div>
            <div class="language-row">
              <span class="editable" data-edit-key="lang3Name">Hindi</span>
              <div class="language-controls">
                <div class="language-bar ripple-target" data-level-track="lang3Level" title="Нажми по шкале, чтобы изменить уровень">
                  <span data-level-bar="lang3Level"></span>
                </div>
                <span class="language-value" data-level-value="lang3Level"></span>
              </div>
            </div>
          </div>
        </section>

        <section class="card experience-card card-span-3">
          <h2 class="card-title">Experience</h2>

          <div class="experience-list">
            <article class="experience-item experience-item--featured ripple-target">
              <div class="experience-item__head">
                <p class="experience-item__period editable" data-edit-key="job1Period">Jun. 2023 - Present</p>
                <span class="experience-item__badge">most recent</span>
              </div>
              <div class="experience-item__body">
                <div class="experience-item__meta">
                  <h3 class="editable" data-edit-key="job1Title">Marketing Manager</h3>
                  <p class="editable" data-edit-key="job1Meta">Pankayam&nbsp;&nbsp; | &nbsp;&nbsp;Full-time</p>
                </div>
                <p class="experience-item__text editable" data-edit-key="job1Text">• Strategy development and planning of campaigns that promote the business and generate genuine traffic\n• SEO Content Creation for Blogs, Website, Social media</p>
              </div>
            </article>

            <article class="experience-item ripple-target">
              <div class="experience-item__head">
                <p class="experience-item__period editable" data-edit-key="job2Period">2017 - Present</p>
              </div>
              <div class="experience-item__body">
                <div class="experience-item__meta">
                  <h3 class="editable" data-edit-key="job2Title">Graphic / Web designer</h3>
                  <p class="editable" data-edit-key="job2Meta">Freelance</p>
                </div>
                <p class="experience-item__text editable" data-edit-key="job2Text">• Development of internal projects from scratch, product design of brands\n• Landing page, webapps and hybrid apps\n• Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary</p>
              </div>
            </article>

            <article class="experience-item ripple-target">
              <div class="experience-item__head">
                <p class="experience-item__period editable" data-edit-key="job3Period">Sep. 2021 - Jun. 2023</p>
              </div>
              <div class="experience-item__body">
                <div class="experience-item__meta">
                  <h3 class="editable" data-edit-key="job3Title">Legal Assistant</h3>
                  <p class="editable" data-edit-key="job3Meta">Law Firm &nbsp;|&nbsp; Intern</p>
                </div>
                <p class="experience-item__text editable" data-edit-key="job3Text">• Provide administrative support to lawyer and enhance office effectiveness\n• Handle communication with clients, witnesses etc.\n• Prepare case briefs and summarize depositions, interrogatories and testimony</p>
              </div>
            </article>
          </div>
        </section>

        <aside class="card tools-card ripple-target">
          <h2 class="card-title">Tools</h2>
          <div class="tool-stack">
            <section class="tool-group">
              <span class="tool-group__tag">design</span>
              <div class="tool-icons">
                <img src="/figma.svg" alt="Figma" />
                <img src="/photoshop.svg" alt="Photoshop" />
                <img src="/illustrator.svg" alt="Illustrator" />
                <img src="/premiere.svg" alt="Premiere Pro" />
                <img src="/notion.svg" alt="Notion" />
                <img src="/google_meet.svg" alt="Google Meet" />
              </div>
            </section>

            <section class="tool-group">
              <span class="tool-group__tag">no-code</span>
              <div class="tool-icons">
                <img src="/xz_icon1.svg" alt="No-code tool 1" />
                <img src="/xz_icon2.svg" alt="No-code tool 2" />
                <img src="/xz_icon3.svg" alt="No-code tool 3" />
                <img src="/xz_icon4.svg" alt="No-code tool 4" />
              </div>
            </section>

            <section class="tool-group">
              <span class="tool-group__tag">artificial intelligence</span>
              <div class="tool-icons">
                <img src="/chatgpt.svg" alt="ChatGPT" />
                <img src="/copilot.svg" alt="Copilot" />
                <img src="/midjorney.svg" alt="Midjourney" />
              </div>
            </section>
          </div>
        </aside>

        <section class="card education-card card-span-2">
          <h2 class="card-title">Education</h2>
          <div class="education-grid">
            <article class="education-item education-item--featured ripple-target">
              <div class="education-item__head">
                <p class="editable" data-edit-key="edu1Year">2023</p>
                <span class="education-item__mark"><img src="/heart.svg" alt="Favourite" /></span>
              </div>
              <h3 class="editable" data-edit-key="edu1Title">UI/UX</h3>
              <p class="education-item__tags editable" data-edit-key="edu1Tags">#UX #UI #research #DesignSystem #UI #wireframing #figma #ux</p>
              <p class="education-item__place editable" data-edit-key="edu1Place">Coursera</p>
            </article>

            <article class="education-item ripple-target">
              <div class="education-item__head">
                <p class="editable" data-edit-key="edu2Year">2017 - 2022</p>
              </div>
              <h3 class="editable" data-edit-key="edu2Title">Law</h3>
              <p class="education-item__tags editable" data-edit-key="edu2Tags">#law #legalStudies #contracts #internationalLaws</p>
              <p class="education-item__place editable" data-edit-key="edu2Place">University of Kerala</p>
            </article>

            <article class="education-item ripple-target education-item--compact">
              <div class="education-item__head">
                <p class="editable" data-edit-key="edu3Year">2017</p>
              </div>
              <h3 class="editable" data-edit-key="edu3Title">Graphic design</h3>
              <p class="education-item__tags editable" data-edit-key="edu3Tags">#branding #web #illustration #adobe</p>
              <p class="education-item__place editable" data-edit-key="edu3Place">Coursera</p>
            </article>
          </div>
        </section>

        <div class="extra-column card-span-2">
          <section class="card interests-card ripple-target">
            <h2 class="card-title">Interests</h2>
            <div class="interest-tags">
              <span class="interest-tag editable" data-edit-key="interest1">branding</span>
              <span class="interest-tag editable" data-edit-key="interest2">design</span>
              <span class="interest-tag editable" data-edit-key="interest3">photography</span>
              <span class="interest-tag editable" data-edit-key="interest4">artificial intelligence</span>
              <span class="interest-tag editable" data-edit-key="interest5">illustration</span>
              <span class="interest-tag editable" data-edit-key="interest6">typography</span>
              <span class="interest-tag editable" data-edit-key="interest7">social networks</span>
              <span class="interest-tag editable" data-edit-key="interest8">research</span>
              <span class="interest-tag editable" data-edit-key="interest9">dron pilot</span>
              <span class="interest-tag editable" data-edit-key="interest10">games</span>
            </div>
          </section>

          <section class="card contact-card ripple-target">
            <h2 class="contact-card__title editable" data-edit-key="contactTitle">Let’s chat! I’m ready to work on exciting projects</h2>
            <p class="contact-card__mail editable" data-edit-key="contactMail">srkarthik.designscape@gmail.com</p>
          </section>
        </div>
      </section>
    </article>
  </main>
`;

setupResumeEditor();
