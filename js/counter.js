const STORAGE_KEY = 'lab14-bento-resume';

const DEFAULT_RESUME_DATA = {
  greeting: 'Hello 👋 I’m',
  fullName: 'Karthik SR',
  role: 'UX/UI Designer',
  avatarImage: '',
  lang1Name: 'English',
  lang2Name: 'Malayalam',
  lang3Name: 'Hindi',
  lang1Level: 100,
  lang2Level: 100,
  lang3Level: 74,
  job1Period: 'Jun. 2023 - Present',
  job1Title: 'Marketing Manager',
  job1Meta: 'Pankayam  |  Full-time',
  job1Text:
    '• Strategy development and planning of campaigns that promote the business and generate genuine traffic\n• SEO Content Creation for Blogs, Website, Social media',
  job2Period: '2017 - Present',
  job2Title: 'Graphic / Web designer',
  job2Meta: 'Freelance',
  job2Text:
    '• Development of internal projects from scratch, product design of brands\n• Landing page, webapps and hybrid apps\n• Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary',
  job3Period: 'Sep. 2021 - Jun. 2023',
  job3Title: 'Legal Assistant',
  job3Meta: 'Law Firm | Intern',
  job3Text:
    '• Provide administrative support to lawyer and enhance office effectiveness\n• Handle communication with clients, witnesses etc.\n• Prepare case briefs and summarize depositions, interrogatories and testimony',
  edu1Year: '2023',
  edu1Title: 'UI/UX',
  edu1Tags: '#UX #UI #research #DesignSystem #UI #wireframing #figma #ux',
  edu1Place: 'Coursera',
  edu2Year: '2017 - 2022',
  edu2Title: 'Law',
  edu2Tags: '#law #legalStudies #contracts #internationalLaws',
  edu2Place: 'University of Kerala',
  edu3Year: '2017',
  edu3Title: 'Graphic design',
  edu3Tags: '#branding #web #illustration #adobe',
  edu3Place: 'Coursera',
  interest1: 'branding',
  interest2: 'design',
  interest3: 'photography',
  interest4: 'artificial intelligence',
  interest5: 'illustration',
  interest6: 'typography',
  interest7: 'social networks',
  interest8: 'research',
  interest9: 'dron pilot',
  interest10: 'games',
  contactTitle: 'Let’s chat! I’m ready to work on exciting projects',
  contactMail: 'srkarthik.designscape@gmail.com'
};

function clampLevel(value) {
  return Math.min(100, Math.max(0, Number(value) || 0));
}

function updatePrintMetrics() {
  const shell = document.querySelector('.resume-shell');

  if (!shell) {
    return;
  }

  const previousZoom = shell.style.zoom;
  shell.style.zoom = '';

  document.documentElement.style.setProperty('--resume-print-width', `${shell.offsetWidth}px`);
  document.documentElement.style.setProperty('--resume-print-height', `${shell.scrollHeight}px`);

  shell.style.zoom = previousZoom;
}

function getStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const merged = raw ? { ...DEFAULT_RESUME_DATA, ...JSON.parse(raw) } : { ...DEFAULT_RESUME_DATA };

    merged.lang1Level = clampLevel(merged.lang1Level);
    merged.lang2Level = clampLevel(merged.lang2Level);
    merged.lang3Level = clampLevel(merged.lang3Level);
    merged.avatarImage = typeof merged.avatarImage === 'string' ? merged.avatarImage : '';

    return merged;
  } catch (error) {
    console.error('Не удалось прочитать сохраненные данные:', error);
    return { ...DEFAULT_RESUME_DATA };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateDocumentTitle(data) {
  const fullName = data.fullName?.trim() || DEFAULT_RESUME_DATA.fullName;
  document.title = `${fullName} — CV`;
}

function getAvatarInitials(data) {
  return (data.fullName || DEFAULT_RESUME_DATA.fullName)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

function updateAvatar(data) {
  const avatar = document.querySelector('[data-avatar]');

  if (!avatar) {
    return;
  }

  const initials = getAvatarInitials(data) || 'CV';

  if (data.avatarImage) {
    avatar.style.backgroundImage = `url(${data.avatarImage})`;
    avatar.dataset.hasImage = 'true';
    avatar.textContent = '';
  } else {
    avatar.style.backgroundImage = '';
    avatar.dataset.hasImage = 'false';
    avatar.textContent = initials;
  }
}

function updateLanguageBars(data) {
  const bars = document.querySelectorAll('[data-level-bar]');
  const values = document.querySelectorAll('[data-level-value]');

  bars.forEach((bar) => {
    const key = bar.dataset.levelBar;
    const level = clampLevel(data[key]);
    bar.style.width = `${level}%`;
    bar.setAttribute('aria-valuenow', String(level));
  });

  values.forEach((valueEl) => {
    const key = valueEl.dataset.levelValue;
    const level = clampLevel(data[key]);
    valueEl.textContent = `${level}%`;
  });
}

function applyData(data) {
  const editables = document.querySelectorAll('[data-edit-key]');

  editables.forEach((element) => {
    const key = element.dataset.editKey;

    if (typeof data[key] === 'string') {
      element.textContent = data[key];
    }
  });

  updateLanguageBars(data);
  updateAvatar(data);
  updateDocumentTitle(data);
}

function animateEdit(element) {
  if (!element) {
    return;
  }

  element.classList.remove('edited');
  void element.offsetWidth;
  element.classList.add('edited');
}

function createRipple(event, element) {
  const target = element || event.currentTarget;

  if (!target) return;

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const left = event.clientX - rect.left - size / 2;
  const top = event.clientY - rect.top - size / 2;

  const lightRipple = document.createElement('span');
  lightRipple.className = 'ripple ripple--light';
  lightRipple.style.width = `${size}px`;
  lightRipple.style.height = `${size}px`;
  lightRipple.style.left = `${left}px`;
  lightRipple.style.top = `${top}px`;

  const darkRipple = document.createElement('span');
  darkRipple.className = 'ripple ripple--dark';
  darkRipple.style.width = `${size * 1.05}px`;
  darkRipple.style.height = `${size * 1.05}px`;
  darkRipple.style.left = `${event.clientX - rect.left - (size * 1.05) / 2}px`;
  darkRipple.style.top = `${event.clientY - rect.top - (size * 1.05) / 2}px`;

  target.append(lightRipple, darkRipple);

  setTimeout(() => lightRipple.remove(), 1000);
  setTimeout(() => darkRipple.remove(), 1100);
}

function bindEditableElements(data) {
  const editables = document.querySelectorAll('[data-edit-key]');

  editables.forEach((element) => {
    element.setAttribute('contenteditable', 'true');
    element.setAttribute('spellcheck', 'false');
    element.classList.add('editable', 'ripple-target');

    element.addEventListener('input', () => {
      const key = element.dataset.editKey;
      data[key] = element.textContent.trim();
      saveData(data);
      updateAvatar(data);
      updateDocumentTitle(data);
      animateEdit(element);
    });

    element.addEventListener('click', (event) => {
      createRipple(event, element);
    });
  });
}

function bindLanguageBars(data) {
  const tracks = document.querySelectorAll('[data-level-track]');

  tracks.forEach((track) => {
    track.addEventListener('click', (event) => {
      const key = track.dataset.levelTrack;
      const rect = track.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percent = Math.round((clickX / rect.width) * 100);

      data[key] = clampLevel(percent);
      updateLanguageBars(data);
      saveData(data);
      animateEdit(track.closest('.language-row'));
      createRipple(event, track);
    });
  });
}

function bindAvatarUpload(data) {
  const avatar = document.querySelector('[data-avatar]');
  const input = document.querySelector('#avatar-input');

  if (!avatar || !input) {
    return;
  }

  avatar.addEventListener('click', (event) => {
    createRipple(event, avatar);
    input.value = '';
    input.click();
  });

  input.addEventListener('change', () => {
    const [file] = input.files || [];

    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      data.avatarImage = typeof reader.result === 'string' ? reader.result : '';
      saveData(data);
      updateAvatar(data);
      animateEdit(avatar.closest('.photo-card'));
    });

    reader.readAsDataURL(file);
  });
}

function bindRippleTargets() {
  const targets = document.querySelectorAll('.ripple-target');

  targets.forEach((element) => {
    if (element.dataset.rippleReady === 'true') {
      return;
    }

    element.addEventListener('click', (event) => {
      if (event.target.closest('[data-edit-key]') || event.target.closest('[data-avatar]')) {
        return;
      }

      createRipple(event, element);
    });

    element.dataset.rippleReady = 'true';
  });
}

function resetResume(data) {
  Object.keys(DEFAULT_RESUME_DATA).forEach((key) => {
    data[key] = DEFAULT_RESUME_DATA[key];
  });

  saveData(data);
  applyData(data);
}

function downloadPdf(data) {
  updateDocumentTitle(data);
  updatePrintMetrics();

  requestAnimationFrame(() => {
    window.print();
  });
}

export function setupResumeEditor() {
  const data = getStoredData();

  applyData(data);
  bindEditableElements(data);
  bindLanguageBars(data);
  bindAvatarUpload(data);
  bindRippleTargets();

  const resetButton = document.querySelector('#reset-resume');
  const downloadButton = document.querySelector('#download-pdf');

  updatePrintMetrics();
  window.addEventListener('beforeprint', updatePrintMetrics);
  window.addEventListener('resize', updatePrintMetrics);

  if (resetButton) {
    resetButton.addEventListener('click', (event) => {
      createRipple(event, resetButton);
      resetResume(data);
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener('click', (event) => {
      createRipple(event, downloadButton);
      downloadPdf(data);
    });
  }
}
