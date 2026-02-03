import React, { useMemo, useState } from 'react';
import {
  Document as DocxDocument,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from 'docx';

const DEFAULT_TONE = 'professional';

const COMMON_SKILLS = [
  'Customer service',
  'Teamwork',
  'Communication',
  'Problem solving',
  'Time management',
  'Organization',
  'Reliability',
  'Adaptability',
  'Attention to detail',
  'Cash handling',
  'POS systems',
  'Scheduling',
  'Data entry',
  'Inventory',
  'Microsoft Office',
  'Google Workspace',
];

const DOC_TYPES = {
  resume: {
    title: 'Resume Builder',
    estimate: '2–5 min',
  },
  cover_letter: {
    title: 'Cover Letter',
    estimate: '3–6 min',
  },
  thank_you: {
    title: 'Thank You Letter',
    estimate: '2–4 min',
  },
  resignation: {
    title: 'Resignation Letter',
    estimate: '2–4 min',
  },
};

const buildFullTextFromSections = (sections = []) => {
  return sections
    .map((section) => {
      const lines = [];
      if (section.label) lines.push(section.label);
      if (section.content) lines.push(section.content);
      if (Array.isArray(section.bullets) && section.bullets.length) {
        section.bullets.forEach((b) => {
          if (b && b.trim()) lines.push(`• ${b.trim()}`);
        });
      }
      return lines.filter(Boolean).join('\n');
    })
    .filter(Boolean)
    .join('\n\n')
    .trim();
};

const sanitizeHtml = (raw = '') => {
  if (typeof window === 'undefined') return raw || '';
  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'div',
        'span',
      ],
      ALLOWED_ATTR: ['class', 'href'],
    });
  }
  return raw || '';
};

const normalizeWhitespace = (value = '') => {
  const text = String(value).replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const lowered = text.toLowerCase();
  if (['n/a', 'na', 'none', 'not applicable'].includes(lowered)) return '';
  return text;
};

const normalizeName = (value = '') => {
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return '';
  return cleaned.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const normalizeEmail = (value = '') => normalizeWhitespace(value).toLowerCase();

const normalizePhone = (value = '') => {
  const digits = String(value).replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return normalizeWhitespace(value);
};

const normalizeBullet = (value = '') => {
  const text = normalizeWhitespace(value);
  if (!text) return '';
  const multiSentence = /[.!?].+[.!?]/.test(text);
  if (!multiSentence && text.endsWith('.')) return text.slice(0, -1);
  return text;
};

const normalizeDate = (value = '', { mode = 'resume' } = {}) => {
  const trimmed = normalizeWhitespace(value);
  if (!trimmed) return '';
  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) {
    if (mode === 'letter') {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }
  return trimmed;
};

const normalizeDateRange = (value = '') => {
  const trimmed = normalizeWhitespace(value);
  if (!trimmed) return '';
  const parts = trimmed.split(/\s*[–-]\s*/);
  if (parts.length === 1) return normalizeDate(trimmed, { mode: 'resume' });
  const start = normalizeDate(parts[0], { mode: 'resume' });
  const endRaw = normalizeWhitespace(parts[1] || '');
  const end = /present|current/i.test(endRaw)
    ? 'Present'
    : normalizeDate(endRaw, { mode: 'resume' });
  return [start, end].filter(Boolean).join(' — ');
};

const normalizeInputs = (input = {}, docType) => {
  const profile = input.profile || {};
  const normalized = {
    ...input,
    profile: {
      ...profile,
      firstName: normalizeName(profile.firstName || ''),
      lastName: normalizeName(profile.lastName || ''),
      email: normalizeEmail(profile.email || ''),
      phone: normalizePhone(profile.phone || ''),
      cityState: normalizeWhitespace(profile.cityState || ''),
      headline: normalizeWhitespace(profile.headline || ''),
      linkedIn: normalizeWhitespace(profile.linkedIn || ''),
      portfolio: normalizeWhitespace(profile.portfolio || ''),
    },
    targetRole: normalizeWhitespace(input.targetRole || ''),
    targetCompany: normalizeWhitespace(input.targetCompany || ''),
    summary: normalizeWhitespace(input.summary || ''),
    tone: normalizeWhitespace(input.tone || DEFAULT_TONE),
    format: input.format || 'email',
    length: input.length || 'standard',
    highlights: Array.isArray(input.highlights)
      ? input.highlights.map(normalizeBullet).filter(Boolean)
      : [],
    topSkills: Array.isArray(input.topSkills)
      ? input.topSkills.map(normalizeWhitespace).filter(Boolean)
      : [],
    skills: Array.isArray(input.skills)
      ? input.skills.map(normalizeWhitespace).filter(Boolean)
      : [],
    certifications: Array.isArray(input.certifications)
      ? input.certifications.map(normalizeWhitespace).filter(Boolean)
      : [],
    role: normalizeWhitespace(input.role || ''),
    company: normalizeWhitespace(input.company || ''),
    interviewerName: normalizeName(input.interviewerName || ''),
    managerName: normalizeName(input.managerName || ''),
    whyCompany: normalizeWhitespace(input.whyCompany || ''),
    achievement: normalizeWhitespace(input.achievement || ''),
    availability: normalizeWhitespace(input.availability || ''),
    preferredContact: normalizeWhitespace(input.preferredContact || ''),
    discussionPoints: Array.isArray(input.discussionPoints)
      ? input.discussionPoints.map(normalizeWhitespace).filter(Boolean)
      : [],
    transitionPlan: Array.isArray(input.transitionPlan)
      ? input.transitionPlan.map(normalizeWhitespace).filter(Boolean)
      : [],
    experience: Array.isArray(input.experience)
      ? input.experience.map((item) => ({
          org: normalizeWhitespace(item?.org || ''),
          role: normalizeWhitespace(item?.role || ''),
          dates: normalizeDateRange(item?.dates || ''),
          duties: Array.isArray(item?.duties)
            ? item.duties.map(normalizeBullet).filter(Boolean)
            : [],
          achievements: Array.isArray(item?.achievements)
            ? item.achievements.map(normalizeBullet).filter(Boolean)
            : [],
        }))
      : [],
    projects: Array.isArray(input.projects)
      ? input.projects.map((item) => ({
          name: normalizeWhitespace(item?.name || ''),
          description: normalizeWhitespace(item?.description || ''),
          bullets: Array.isArray(item?.bullets)
            ? item.bullets.map(normalizeBullet).filter(Boolean)
            : [],
        }))
      : [],
    volunteer: Array.isArray(input.volunteer)
      ? input.volunteer.map((item) => ({
          org: normalizeWhitespace(item?.org || ''),
          role: normalizeWhitespace(item?.role || ''),
          dates: normalizeDateRange(item?.dates || ''),
          bullets: Array.isArray(item?.bullets)
            ? item.bullets.map(normalizeBullet).filter(Boolean)
            : [],
        }))
      : [],
    education: Array.isArray(input.education)
      ? input.education.map((item) => ({
          school: normalizeWhitespace(item?.school || ''),
          credential: normalizeWhitespace(item?.credential || ''),
          gradYear: normalizeWhitespace(item?.gradYear || ''),
        }))
      : [],
  };

  if (docType === 'resignation') {
    normalized.lastDay = normalizeDate(input.lastDay || '', { mode: 'letter' });
  }

  return normalized;
};

const buildDocMeta = (input = {}, docType) => {
  const profile = input.profile || {};
  const name = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  const contactLine = [profile.cityState, profile.phone, profile.email]
    .filter(Boolean)
    .join(' | ');
  const date = normalizeDate(new Date().toISOString(), { mode: 'letter' });
  return {
    name,
    contactLine,
    date,
    company: input.targetCompany || input.company || '',
    managerName: input.managerName || input.interviewerName || '',
    role: input.targetRole || input.role || '',
    format: input.format || 'letter',
    docType,
  };
};

const formatDocText = (text = '') => String(text).replace(/\n/g, '<br />');

const buildDocPackSections = (input = {}, docType) => {
  const sections = [];
  if (docType === 'resume') {
    const profile = input.profile || {};
    const name = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
    const contactLine = [
      profile.cityState,
      profile.phone,
      profile.email,
      profile.linkedIn,
      profile.portfolio,
    ]
      .filter(Boolean)
      .join(' • ');

    if (name || contactLine || profile.headline) {
      sections.push({
        id: 'contact',
        label: 'Contact',
        content: [name, profile.headline, contactLine]
          .filter(Boolean)
          .join('\n'),
        bullets: [],
      });
    }

    if (input.summary) {
      sections.push({
        id: 'summary',
        label: 'Summary',
        content: input.summary,
        bullets: [],
      });
    }

    if (input.skills?.length) {
      sections.push({
        id: 'skills',
        label: 'Skills',
        content: '',
        bullets: input.skills,
      });
    }

    const experienceItems = Array.isArray(input.experience)
      ? input.experience.filter((item) => item && (item.role || item.org))
      : [];
    if (experienceItems.length) {
      experienceItems.forEach((item, idx) => {
        const bullets = [...(item.achievements || []), ...(item.duties || [])]
          .filter(Boolean)
          .slice(0, 6);
        const contentLines = [
          `${item.role || ''} — ${item.org || ''}`.replace(/\s+/g, ' ').trim(),
          item.dates || '',
        ].filter(Boolean);
        sections.push({
          id: idx === 0 ? 'experience' : `experience-${idx}`,
          label: idx === 0 ? 'Experience' : '',
          content: contentLines.join('\n'),
          bullets,
        });
      });
    }

    const projectItems = Array.isArray(input.projects)
      ? input.projects.filter((item) => item && (item.name || item.description))
      : [];
    if (projectItems.length) {
      projectItems.forEach((project, idx) => {
        sections.push({
          id: idx === 0 ? 'projects' : `projects-${idx}`,
          label: idx === 0 ? 'Projects' : '',
          content: project.name || project.description,
          bullets: Array.isArray(project.bullets)
            ? project.bullets.filter(Boolean)
            : [],
        });
      });
    }

    const volunteerItems = Array.isArray(input.volunteer)
      ? input.volunteer.filter((item) => item && (item.org || item.role))
      : [];
    if (volunteerItems.length) {
      volunteerItems.forEach((volunteer, idx) => {
        const contentLines = [
          `${volunteer.role || ''} — ${volunteer.org || ''}`
            .replace(/\s+/g, ' ')
            .trim(),
          volunteer.dates || '',
        ].filter(Boolean);
        sections.push({
          id: idx === 0 ? 'volunteer' : `volunteer-${idx}`,
          label: idx === 0 ? 'Volunteer Experience' : '',
          content: contentLines.join('\n'),
          bullets: Array.isArray(volunteer.bullets)
            ? volunteer.bullets.filter(Boolean)
            : [],
        });
      });
    }

    const educationItems = Array.isArray(input.education)
      ? input.education.filter(
          (item) => item && (item.school || item.credential)
        )
      : [];
    if (educationItems.length) {
      const lines = educationItems.map((education) => {
        const educationLine =
          `${education.credential || ''}, ${education.school || ''}`
            .replace(/,\s*$/, '')
            .trim();
        return education.gradYear
          ? `${educationLine} (${education.gradYear})`
          : educationLine;
      });
      sections.push({
        id: 'education',
        label: 'Education',
        content: lines.filter(Boolean).join('\n'),
        bullets: [],
      });
    }

    if (input.certifications?.length) {
      sections.push({
        id: 'certifications',
        label: 'Certifications',
        content: '',
        bullets: input.certifications,
      });
    }
  }

  if (docType === 'cover_letter') {
    const opening =
      `I am excited to apply for the ${input.targetRole || 'role'} at ${input.targetCompany || 'your company'}. ${input.whyCompany || ''}`
        .replace(/\s+/g, ' ')
        .trim();
    const evidence = [
      input.topSkills?.length
        ? `My strengths include ${input.topSkills.join(', ')}.`
        : '',
      input.achievement ? input.achievement : '',
      ...(input.highlights || []),
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
    const closing = [
      'Thank you for your time and consideration. I would welcome the opportunity to discuss how I can contribute.',
      input.availability ? `Availability: ${input.availability}.` : '',
    ]
      .filter(Boolean)
      .join(' ');
    sections.push({
      id: 'opening',
      label: '',
      content: [opening, evidence, closing].filter(Boolean).join('\n\n'),
      bullets: [],
    });
  }

  if (docType === 'thank_you') {
    const discussion =
      Array.isArray(input.discussionPoints) && input.discussionPoints.length
        ? `We discussed ${input.discussionPoints.join(', ')}.`
        : '';
    const body = [
      `Thank you for meeting with me about the ${input.role || 'role'} at ${input.company || 'your company'}.`,
      discussion,
      input.fitProof ||
        'I appreciated learning more about the team and responsibilities.',
      'Thank you again for your time. I am excited about the opportunity and look forward to next steps.',
    ]
      .filter(Boolean)
      .join('\n\n');
    sections.push({
      id: 'thanks',
      label: '',
      content: body,
      bullets: [],
    });
  }

  if (docType === 'resignation') {
    const body = [
      `Please accept this letter as my formal notice of resignation. My last day will be ${input.lastDay || 'a future date'}.`,
      input.reason || 'Thank you for the opportunity to grow with the team.',
      input.transitionPlan?.length
        ? `Transition plan: ${input.transitionPlan.join(', ')}.`
        : '',
      'I appreciate your support and will do what I can to ensure a smooth transition.',
    ]
      .filter(Boolean)
      .join('\n\n');
    sections.push({
      id: 'notice',
      label: '',
      content: body,
      bullets: [],
    });
  }

  return sections
    .map((section) => ({
      ...section,
      label: section.label
        ? section.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
        : section.label,
      content: normalizeWhitespace(section.content || ''),
      bullets: Array.isArray(section.bullets)
        ? section.bullets.map(normalizeBullet).filter(Boolean)
        : [],
    }))
    .filter((section) => section.content || section.bullets.length);
};

const renderDocHTML = (docPack) => {
  if (!docPack) return '';
  if (docPack.html) return docPack.html;
  const sections = Array.isArray(docPack.sections) ? docPack.sections : [];
  const docType = docPack.docType;
  const meta = docPack.meta || {};
  let headerHtml = docPack.title ? `<h1>${docPack.title}</h1>` : '';
  let prefaceHtml = '';
  let signoffHtml = '';

  const contactIndex = sections.findIndex(
    (section) => section.id === 'contact' || section.label === 'Contact'
  );

  if (docType === 'resume' && contactIndex >= 0) {
    const contact = sections[contactIndex] || {};
    const lines = String(contact.content || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const nameLine = lines[0] || docPack.title || '';
    const headlineLine = lines[1] || '';
    const contactLine = lines.slice(2).join(' • ') || lines[1] || '';
    headerHtml = `
      <div class="doc-header">
        <h1>${nameLine}</h1>
        ${headlineLine ? `<div class="doc-subtitle">${headlineLine}</div>` : ''}
        ${contactLine ? `<div class="doc-contact">${contactLine}</div>` : ''}
      </div>
    `;
  }

  if (docType !== 'resume') {
    const nameLine = meta.name
      ? `<div class="doc-name">${meta.name}</div>`
      : '';
    const contactLine = meta.contactLine
      ? `<div class="doc-contact">${meta.contactLine}</div>`
      : '';
    const dateLine = meta.date
      ? `<div class="doc-date">${meta.date}</div>`
      : '';
    const companyBlock = meta.company
      ? `<div class="doc-company">${meta.company}</div>`
      : '';
    const managerBlock = meta.managerName
      ? `<div class="doc-company">${meta.managerName}</div>`
      : '';
    const salutationName = meta.managerName || '';
    const salutation = salutationName
      ? `<div class="doc-salutation">Dear ${salutationName},</div>`
      : `<div class="doc-salutation">To Whom It May Concern,</div>`;

    if (meta.format === 'letter') {
      headerHtml = `
        <div class="doc-header">
          ${nameLine}
          ${contactLine}
          ${dateLine}
          ${managerBlock}
          ${companyBlock}
        </div>
      `;
      prefaceHtml = salutation;
    } else {
      const subjectLine =
        docType === 'thank_you'
          ? `Subject: Thank you — ${meta.role || 'interview'}`
          : docType === 'resignation'
            ? `Subject: Resignation — ${meta.name || 'Notice'}`
            : '';
      const greetingName = meta.managerName || '';
      const greeting = greetingName
        ? `<div class="doc-salutation">Hello ${greetingName},</div>`
        : `<div class="doc-salutation">Hello,</div>`;
      headerHtml = `
        <div class="doc-header">
          ${nameLine}
          ${contactLine}
        </div>
      `;
      prefaceHtml = `
        ${subjectLine ? `<div class="doc-subject">${subjectLine}</div>` : ''}
        ${greeting}
      `;
    }

    signoffHtml = meta.name
      ? `<div class="doc-signoff">Sincerely,<br />${meta.name}</div>`
      : '';
  }

  const body = sections
    .filter((_, idx) => !(docType === 'resume' && idx === contactIndex))
    .map((section) => {
      const heading = section.label ? `<h3>${section.label}</h3>` : '';
      const content = section.content
        ? `<p>${formatDocText(section.content)}</p>`
        : '';
      const bullets =
        Array.isArray(section.bullets) && section.bullets.length
          ? `<ul>${section.bullets
              .filter(Boolean)
              .map((b) => `<li>${formatDocText(b)}</li>`)
              .join('')}</ul>`
          : '';
      return `<section class="doc-section">${heading}${content}${bullets}</section>`;
    })
    .join('');

  return `
    <div class="doc-print-area">
      <div class="doc-frame doc-type-${docType}">
        <div class="doc-body">${headerHtml}${prefaceHtml}${body}${signoffHtml}</div>
      </div>
    </div>
  `;
};

const renderPlainText = (docPack) => {
  const sections = Array.isArray(docPack?.sections) ? docPack.sections : [];
  const docType = docPack?.docType;
  const meta = docPack?.meta || {};
  const lines = [];

  if (docType === 'thank_you' && meta.format === 'email') {
    lines.push(`Subject: Thank you — ${docPack?.targetRole || 'interview'}`);
    lines.push('');
  }
  if (docType === 'resignation' && meta.format === 'email') {
    lines.push(`Subject: Resignation — ${meta.name || 'Notice'}`);
    lines.push('');
  }

  if (docType !== 'resume' && meta.format === 'letter') {
    if (meta.name) lines.push(meta.name);
    if (meta.contactLine) lines.push(meta.contactLine);
    if (meta.date) lines.push(meta.date);
    if (meta.company) lines.push(meta.company);
    lines.push('');
    lines.push(
      meta.managerName ? `Dear ${meta.managerName},` : 'To Whom It May Concern,'
    );
    lines.push('');
  }

  if (docType !== 'resume' && meta.format === 'email') {
    lines.push(meta.managerName ? `Hello ${meta.managerName},` : 'Hello,');
    lines.push('');
  }

  sections.forEach((section) => {
    if (section.label) lines.push(section.label);
    if (section.content) lines.push(section.content);
    if (Array.isArray(section.bullets) && section.bullets.length) {
      section.bullets.forEach((b) => {
        if (b) lines.push(`• ${b}`);
      });
    }
    lines.push('');
  });

  if (docType !== 'resume') {
    lines.push('Sincerely,');
    if (meta.name) lines.push(meta.name);
  }

  return lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const emptyDocPack = (docType) => ({
  ok: true,
  docType,
  title: '',
  tone: DEFAULT_TONE,
  targetRole: null,
  targetCompany: null,
  sections: [],
  fullText: '',
  html: '',
  atsKeywords: [],
  notes: [],
  meta: {
    generatedAt: new Date().toISOString(),
    generatorVersion: 'local',
  },
});

const isDocPackEmpty = (docPack) => {
  const sections = Array.isArray(docPack?.sections) ? docPack.sections : [];
  if (!sections.length) return true;
  return sections.every((section) => {
    const hasContent = Boolean(section?.content && section.content.trim());
    const hasBullets =
      Array.isArray(section?.bullets) &&
      section.bullets.some((b) => Boolean(b && String(b).trim()));
    return !hasContent && !hasBullets;
  });
};

const buildLocalFallbackDocPack = (form, docType) => {
  const normalized = normalizeInputs(form, docType);
  const sections = buildDocPackSections(normalized, docType);
  const profile = normalized.profile || {};
  const name = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  const titleByType = {
    resume: name ? `${name} - Resume` : 'Resume',
    cover_letter: `Cover Letter - ${normalized.targetRole || 'Role'}`,
    thank_you: `Thank You - ${normalized.role || 'Interview'}`,
    resignation: `Resignation - ${normalized.company || 'Company'}`,
  };

  return {
    ...emptyDocPack(docType),
    title: titleByType[docType] || 'Document',
    tone: normalized.tone || DEFAULT_TONE,
    targetRole: normalized.targetRole || normalized.role || null,
    targetCompany: normalized.targetCompany || normalized.company || null,
    sections,
    meta: {
      ...emptyDocPack(docType).meta,
      ...buildDocMeta(normalized, docType),
      format: normalized.format,
      generatedAt: new Date().toISOString(),
    },
  };
};

const readLocalVersions = (userId, docType) => {
  try {
    const key = `careerDocs:${userId || 'guest'}:${docType}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocalVersions = (userId, docType, versions) => {
  try {
    const key = `careerDocs:${userId || 'guest'}:${docType}`;
    localStorage.setItem(key, JSON.stringify(versions));
  } catch {}
};

const createVersionEntry = (docPack) => ({
  id: `${docPack.docType}-${Date.now()}`,
  title:
    docPack.title || `${DOC_TYPES[docPack.docType]?.title || 'Document'} Draft`,
  docPack,
  createdAt: new Date().toISOString(),
});

const KeywordAlignmentPanel = ({ docPack }) => {
  const keywords = Array.isArray(docPack?.atsKeywords)
    ? docPack.atsKeywords
    : [];
  const fullText = String(docPack?.fullText || '').toLowerCase();
  const coverage = keywords.map((kw) => {
    const normalized = String(kw || '')
      .toLowerCase()
      .trim();
    const present = normalized && fullText.includes(normalized);
    return { keyword: kw, present };
  });
  const missing = coverage.filter((c) => !c.present).slice(0, 3);

  if (!keywords.length) return null;

  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-slate-900/70">
      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
        ATS Keyword Alignment
      </h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {coverage.map((c) => (
          <span
            key={c.keyword}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              c.present
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {c.keyword}
          </span>
        ))}
      </div>
      {missing.length > 0 && (
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Consider adding: {missing.map((m) => m.keyword).join(', ')}
        </p>
      )}
    </div>
  );
};

const VersionHistory = ({ versions, onRestore, onDelete }) => {
  if (!versions.length) {
    return (
      <div className="text-sm text-slate-500">
        No saved versions yet. Generate or save a draft to start tracking
        history.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {versions.map((version) => (
        <div
          key={version.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-lg p-3 bg-white dark:bg-slate-900/70"
        >
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {version.title}
            </div>
            <div className="text-xs text-slate-500">
              {new Date(version.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onRestore(version)}
              className="px-3 py-1 text-sm font-semibold rounded-md bg-teal-600 text-white hover:bg-teal-700"
            >
              Restore
            </button>
            <button
              type="button"
              onClick={() => onDelete(version)}
              className="px-3 py-1 text-sm font-semibold rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ExportBar = ({
  docPack,
  onCopy,
  onPrint,
  onDownload,
  onDownloadDocx,
  onScore,
  scoreLabel,
  onUpgradeBullets,
  upgradeLabel,
}) => (
  <div className="flex flex-wrap items-center gap-2 no-print">
    <button
      type="button"
      onClick={onCopy}
      className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
    >
      Copy
    </button>
    <button
      type="button"
      onClick={onPrint}
      className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
    >
      Print / Save PDF
    </button>
    <button
      type="button"
      onClick={onDownload}
      className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
    >
      Download JSON
    </button>
    <button
      type="button"
      onClick={onDownloadDocx}
      className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
    >
      Download DOCX
    </button>
    {onScore && (
      <button
        type="button"
        onClick={onScore}
        className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
      >
        {scoreLabel}
      </button>
    )}
    {onUpgradeBullets && (
      <button
        type="button"
        onClick={onUpgradeBullets}
        className="px-4 py-2 rounded-md bg-amber-500 text-white font-semibold hover:bg-amber-600"
      >
        {upgradeLabel || 'Upgrade Bullets'}
      </button>
    )}
  </div>
);

const DocumentEditor = ({ docPack, onUpdate }) => {
  const updateSection = (index, patch) => {
    const sections = Array.isArray(docPack.sections) ? docPack.sections : [];
    const nextSections = sections.map((section, i) =>
      i === index ? { ...section, ...patch } : section
    );
    onUpdate({
      ...docPack,
      sections: nextSections,
      fullText: buildFullTextFromSections(nextSections),
    });
  };

  const updateFullText = (value) => {
    onUpdate({ ...docPack, fullText: value });
  };

  return (
    <div className="space-y-4">
      {docPack.sections.map((section, idx) => (
        <div key={section.id || idx} className="border rounded-lg p-3">
          <label className="text-sm font-semibold text-slate-700">
            {section.label}
          </label>
          <textarea
            value={section.content || ''}
            onChange={(e) => updateSection(idx, { content: e.target.value })}
            className="w-full mt-2 p-2 border rounded-md"
            rows={3}
          />
          {Array.isArray(section.bullets) && section.bullets.length > 0 && (
            <>
              <label className="text-xs font-semibold text-slate-500 mt-3 block">
                Bullet list (one per line)
              </label>
              <textarea
                value={section.bullets.join('\n')}
                onChange={(e) =>
                  updateSection(idx, {
                    bullets: e.target.value
                      .split('\n')
                      .map((b) => b.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full mt-2 p-2 border rounded-md"
                rows={3}
              />
            </>
          )}
        </div>
      ))}
      <div className="border rounded-lg p-3">
        <label className="text-sm font-semibold text-slate-700">
          Full Text (editable)
        </label>
        <textarea
          value={docPack.fullText || ''}
          onChange={(e) => updateFullText(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          rows={8}
        />
        <p className="text-xs text-slate-500 mt-1">
          Full text is rebuilt from sections when you save versions.
        </p>
      </div>
    </div>
  );
};

const buildDocxFromDocPack = (docPack) => {
  const sections = Array.isArray(docPack?.sections) ? docPack.sections : [];
  const meta = docPack?.meta || {};
  const docType = docPack?.docType || 'document';

  const children = [];

  if (docType === 'resume') {
    const headerLines = sections.find((s) => s.id === 'contact')?.content || '';
    const lines = String(headerLines)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const nameLine = lines[0] || docPack?.title || '';
    const headlineLine = lines[1] || '';
    const contactLine = lines.slice(2).join(' • ') || lines[1] || '';

    if (nameLine) {
      children.push(
        new Paragraph({
          text: nameLine,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 120 },
        })
      );
    }
    if (headlineLine) {
      children.push(
        new Paragraph({
          text: headlineLine,
          spacing: { after: 120 },
        })
      );
    }
    if (contactLine) {
      children.push(
        new Paragraph({
          text: contactLine,
          spacing: { after: 240 },
        })
      );
    }
  } else {
    if (meta.name) {
      children.push(
        new Paragraph({
          text: meta.name,
          spacing: { after: 120 },
        })
      );
    }
    if (meta.contactLine) {
      children.push(
        new Paragraph({
          text: meta.contactLine,
          spacing: { after: 120 },
        })
      );
    }
    if (meta.format === 'letter' && meta.date) {
      children.push(
        new Paragraph({ text: meta.date, spacing: { after: 120 } })
      );
    }
    if (meta.format === 'letter' && meta.company) {
      children.push(
        new Paragraph({ text: meta.company, spacing: { after: 120 } })
      );
    }
    if (meta.format === 'email') {
      const subject =
        docType === 'thank_you'
          ? `Subject: Thank you — ${meta.role || 'interview'}`
          : docType === 'resignation'
            ? `Subject: Resignation — ${meta.name || 'Notice'}`
            : '';
      if (subject) {
        children.push(
          new Paragraph({ text: subject, spacing: { after: 120 } })
        );
      }
    }
    const greetingName = meta.managerName || '';
    children.push(
      new Paragraph({
        text:
          meta.format === 'email'
            ? greetingName
              ? `Hello ${greetingName},`
              : 'Hello,'
            : greetingName
              ? `Dear ${greetingName},`
              : 'To Whom It May Concern,',
        spacing: { after: 120 },
      })
    );
  }

  sections
    .filter((section) => !(docType === 'resume' && section.id === 'contact'))
    .forEach((section) => {
      if (section.label) {
        children.push(
          new Paragraph({
            text: section.label.toUpperCase(),
            spacing: { before: 120, after: 80 },
          })
        );
      }
      if (section.content) {
        children.push(
          new Paragraph({
            text: section.content,
            spacing: { after: 120 },
          })
        );
      }
      if (Array.isArray(section.bullets)) {
        section.bullets.forEach((bullet) => {
          if (!bullet) return;
          children.push(
            new Paragraph({
              text: bullet,
              bullet: { level: 0 },
              spacing: { after: 80 },
            })
          );
        });
      }
    });

  if (docType !== 'resume') {
    children.push(
      new Paragraph({ text: 'Sincerely,', spacing: { before: 160 } })
    );
    if (meta.name) {
      children.push(new Paragraph({ text: meta.name }));
    }
  }

  return new DocxDocument({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1224,
              right: 1224,
              bottom: 1224,
              left: 1224,
            },
          },
        },
        children,
      },
    ],
  });
};

const DocumentPreview = ({ docPack }) => {
  const html = useMemo(() => sanitizeHtml(renderDocHTML(docPack)), [docPack]);
  return (
    <div className="workforce-doc-preview border rounded-xl p-4 bg-white">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const DocWizardShell = ({
  title,
  steps,
  stepIndex,
  onBack,
  onNext,
  onGenerate,
  canGoBack,
  canGoNext,
  isLast,
  children,
  advanced,
  onToggleAdvanced,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      {onToggleAdvanced && (
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <input
            type="checkbox"
            checked={advanced}
            onChange={(e) => onToggleAdvanced(e.target.checked)}
          />
          Advanced mode
        </label>
      )}
    </div>
    <div className="flex items-center gap-2 text-xs font-semibold">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full ${
              idx === stepIndex
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {step}
          </span>
          {idx < steps.length - 1 && <span className="text-slate-400">→</span>}
        </div>
      ))}
    </div>
    <div>{children}</div>
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
        disabled={!canGoBack}
      >
        Back
      </button>
      {isLast ? (
        <button
          type="button"
          onClick={onGenerate}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
        >
          Generate Document
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
          disabled={!canGoNext}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

const ReviewPanel = ({ review }) => {
  if (!review) return null;
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-900/70">
      <div className="text-sm font-semibold text-slate-700">Review</div>
      {review.score != null && (
        <div className="text-2xl font-bold text-slate-900 mt-1">
          {review.score}
        </div>
      )}
      {Array.isArray(review.feedback) && review.feedback.length > 0 && (
        <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
          {review.feedback.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>
      )}
      {Array.isArray(review.strengths) && review.strengths.length > 0 && (
        <div className="text-xs text-emerald-700 mt-2">
          Strengths: {review.strengths.join('; ')}
        </div>
      )}
      {Array.isArray(review.improvements) && review.improvements.length > 0 && (
        <div className="text-xs text-amber-700 mt-1">
          Improvements: {review.improvements.join('; ')}
        </div>
      )}
    </div>
  );
};

const DocTool = ({
  docType,
  formDefaults,
  apiBase,
  userId,
  onBack,
  quickFields,
  advancedFields,
  buildPayload,
  reviewConfig,
  bulletUpgradeConfig,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [advanced, setAdvanced] = useState(false);
  const [form, setForm] = useState(formDefaults);
  const [docPack, setDocPack] = useState(null);
  const [versions, setVersions] = useState(() =>
    readLocalVersions(userId, docType)
  );
  const [review, setReview] = useState(null);
  const steps = ['Basics', 'Details', 'Generate'];

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleGenerate = async () => {
    setReview(null);
    const payload = buildPayload(form);
    const endpoint = `${apiBase}/api/workforce/${docType.replace('_', '-')}-generate`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Document generation failed');
      const data = await res.json();
      let pack = { ...emptyDocPack(docType), ...data };
      const normalized = normalizeInputs(form, docType);
      pack.meta = { ...pack.meta, ...buildDocMeta(normalized, docType) };
      const normalizedSections = buildDocPackSections(normalized, docType);
      if (normalizedSections.length) {
        pack.sections = normalizedSections;
      }
      if (isDocPackEmpty(pack)) {
        pack = buildLocalFallbackDocPack(form, docType);
      }
      pack.fullText = renderPlainText(pack);
      setDocPack(pack);
      const entry = createVersionEntry(pack);
      const nextVersions = [entry, ...versions].slice(0, 25);
      setVersions(nextVersions);
      writeLocalVersions(userId, docType, nextVersions);
    } catch {
      const fallback = buildLocalFallbackDocPack(form, docType);
      fallback.fullText = renderPlainText(fallback);
      setDocPack(fallback);
    }
  };

  const handleSaveCurrent = () => {
    if (!docPack) return;
    const normalized = {
      ...docPack,
      fullText: renderPlainText(docPack),
    };
    setDocPack(normalized);
    const entry = createVersionEntry(normalized);
    const nextVersions = [entry, ...versions].slice(0, 25);
    setVersions(nextVersions);
    writeLocalVersions(userId, docType, nextVersions);
  };

  const handleRestore = (version) => {
    setDocPack(version.docPack);
  };

  const handleDelete = (version) => {
    const next = versions.filter((v) => v.id !== version.id);
    setVersions(next);
    writeLocalVersions(userId, docType, next);
  };

  const handleCopy = async () => {
    if (!docPack) return;
    try {
      await navigator.clipboard.writeText(renderPlainText(docPack));
      window.showNotification?.('Copied to clipboard', 'success');
    } catch {
      alert('Copy failed.');
    }
  };

  const handleDownload = () => {
    if (!docPack) return;
    const blob = new Blob([JSON.stringify(docPack, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docPack.docType || 'document'}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocx = async () => {
    if (!docPack) return;
    try {
      const doc = buildDocxFromDocPack(docPack);
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docPack.docType || 'document'}-${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('DOCX download failed.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScore = async () => {
    if (!reviewConfig || !docPack) return;
    const payload = reviewConfig.payload(docPack);
    try {
      const res = await fetch(`${apiBase}${reviewConfig.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setReview(data);
    } catch {
      setReview({
        score: null,
        feedback: ['Review unavailable at the moment.'],
      });
    }
  };

  const handleUpgradeBullets = async () => {
    if (!bulletUpgradeConfig || !docPack) return;
    const sections = Array.isArray(docPack.sections) ? docPack.sections : [];
    const positions = [];
    const bullets = [];
    sections.forEach((section, sIdx) => {
      (section.bullets || []).forEach((bullet, bIdx) => {
        positions.push({ sIdx, bIdx });
        bullets.push(bullet);
      });
    });
    if (!bullets.length) return;

    try {
      const res = await fetch(`${apiBase}${bulletUpgradeConfig.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullets,
          targetRole: docPack.targetRole,
          tone: docPack.tone,
          jobPostingText: bulletUpgradeConfig.jobPostingText || null,
        }),
      });
      const data = await res.json();
      const upgraded = Array.isArray(data?.upgradedBullets)
        ? data.upgradedBullets
        : bullets;
      const nextSections = sections.map((section) => ({ ...section }));
      positions.forEach((pos, idx) => {
        if (nextSections[pos.sIdx]?.bullets) {
          nextSections[pos.sIdx].bullets[pos.bIdx] = upgraded[idx];
        }
      });
      setDocPack({
        ...docPack,
        sections: nextSections,
        fullText: buildFullTextFromSections(nextSections),
      });
    } catch {
      // no-op
    }
  };

  if (!docPack) {
    return (
      <DocWizardShell
        title={DOC_TYPES[docType]?.title}
        steps={steps}
        stepIndex={stepIndex}
        onBack={() =>
          stepIndex === 0 ? onBack?.() : setStepIndex((prev) => prev - 1)
        }
        onNext={() => setStepIndex((prev) => prev + 1)}
        onGenerate={handleGenerate}
        canGoBack
        canGoNext
        isLast={stepIndex === steps.length - 1}
        advanced={advanced}
        onToggleAdvanced={setAdvanced}
      >
        {stepIndex === 0 && quickFields({ form, updateForm })}
        {stepIndex === 1 &&
          (advanced ? (
            advancedFields({ form, updateForm })
          ) : (
            <div className="text-sm text-slate-600">
              Quick Mode selected. Toggle Advanced Mode for more options.
            </div>
          ))}
        {stepIndex === 2 && (
          <div className="text-sm text-slate-600">
            Ready to generate your document. You can still go back to edit.
          </div>
        )}
      </DocWizardShell>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">{docPack.title}</h3>
        <div className="flex gap-2 no-print">
          <button
            type="button"
            onClick={handleSaveCurrent}
            className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-sm font-semibold"
          >
            Save current edits
          </button>
          <button
            type="button"
            onClick={() => setDocPack(null)}
            className="px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 text-sm"
          >
            New draft
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DocumentEditor docPack={docPack} onUpdate={setDocPack} />
        </div>
        <div className="space-y-4">
          <ExportBar
            docPack={docPack}
            onCopy={handleCopy}
            onPrint={handlePrint}
            onDownload={handleDownload}
            onDownloadDocx={handleDownloadDocx}
            onScore={reviewConfig ? handleScore : null}
            scoreLabel={reviewConfig?.label}
            onUpgradeBullets={bulletUpgradeConfig ? handleUpgradeBullets : null}
            upgradeLabel={bulletUpgradeConfig?.label}
          />
          <DocumentPreview docPack={docPack} />
          <KeywordAlignmentPanel docPack={docPack} />
          <ReviewPanel review={review} />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-slate-900">
          Version History
        </h4>
        <VersionHistory
          versions={versions}
          onRestore={handleRestore}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

const ResumeWizard = ({ apiBase, userId, onBack }) => (
  <DocTool
    docType="resume"
    apiBase={apiBase}
    userId={userId}
    onBack={onBack}
    formDefaults={{
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cityState: '',
        headline: '',
        linkedIn: '',
        portfolio: '',
      },
      targetRole: '',
      summary: '',
      jobPostingText: '',
      experienceLevel: 'none',
      education: [{ school: '', credential: '', gradYear: '' }],
      experience: [
        { org: '', role: '', dates: '', duties: [], achievements: [] },
      ],
      projects: [{ name: '', description: '', bullets: [] }],
      volunteer: [{ org: '', role: '', dates: '', bullets: [] }],
      skills: [],
      skillsText: '',
      certifications: [],
      tone: 'professional',
      template: 'skills_based',
    }}
    quickFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.profile.firstName}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, firstName: e.target.value },
              })
            }
            placeholder="Example: Jordan"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.profile.lastName}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, lastName: e.target.value },
              })
            }
            placeholder="Example: Lee"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Headline</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.profile.headline}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, headline: e.target.value },
              })
            }
            placeholder="Example: Customer Service | Reliable Team Member"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Contact</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.profile.email}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, email: e.target.value },
              })
            }
            placeholder="Email"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.profile.phone}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, phone: e.target.value },
              })
            }
            placeholder="Phone"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.profile.cityState}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, cityState: e.target.value },
              })
            }
            placeholder="City, State"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Target Role</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.targetRole}
            onChange={(e) => updateForm({ targetRole: e.target.value })}
            placeholder="Example: Retail Associate"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Professional Summary</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.summary}
            onChange={(e) => updateForm({ summary: e.target.value })}
            placeholder="2–3 sentences highlighting strengths, reliability, and the role you're seeking."
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">
            Skills (select common skills)
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {COMMON_SKILLS.map((skill) => (
              <button
                key={skill}
                type="button"
                aria-pressed={form.skills.includes(skill)}
                onClick={() => {
                  const next = form.skills.includes(skill)
                    ? form.skills.filter((s) => s !== skill)
                    : Array.from(new Set([...form.skills, skill]));
                  updateForm({ skills: next });
                }}
                className={`flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-md border transition-colors ${
                  form.skills.includes(skill)
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{skill}</span>
                {form.skills.includes(skill) && (
                  <span className="text-xs font-semibold">✓</span>
                )}
              </button>
            ))}
          </div>
          <label className="text-xs font-semibold text-slate-500 mt-3 block">
            Add custom skills (comma or new line separated)
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.skillsText}
            onChange={(e) => {
              const raw = e.target.value;
              const parsed = raw
                .split(/,|\n/)
                .map((s) => s.trim())
                .filter(Boolean);
              const merged = Array.from(new Set([...form.skills, ...parsed]));
              updateForm({ skillsText: raw, skills: merged });
            }}
            placeholder="Example: Conflict resolution, Bilingual (Spanish)"
            rows={2}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Experience Level</label>
          <select
            className="w-full p-2 border rounded-md"
            value={form.experienceLevel}
            onChange={(e) => updateForm({ experienceLevel: e.target.value })}
          >
            <option value="none">No experience yet</option>
            <option value="some">Some experience</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
      </div>
    )}
    advancedFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Education</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.education[0]?.school}
            onChange={(e) => {
              const next = [...form.education];
              next[0] = { ...next[0], school: e.target.value };
              updateForm({ education: next });
            }}
            placeholder="Example: City Adult Learning Center"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.education[0]?.credential}
            onChange={(e) => {
              const next = [...form.education];
              next[0] = { ...next[0], credential: e.target.value };
              updateForm({ education: next });
            }}
            placeholder="Example: GED (in progress)"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.education[0]?.gradYear}
            onChange={(e) => {
              const next = [...form.education];
              next[0] = { ...next[0], gradYear: e.target.value };
              updateForm({ education: next });
            }}
            placeholder="Graduation year (optional)"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Experience</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.experience[0]?.org}
            onChange={(e) => {
              const next = [...form.experience];
              next[0] = { ...next[0], org: e.target.value };
              updateForm({ experience: next });
            }}
            placeholder="Organization"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.experience[0]?.role}
            onChange={(e) => {
              const next = [...form.experience];
              next[0] = { ...next[0], role: e.target.value };
              updateForm({ experience: next });
            }}
            placeholder="Role"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.experience[0]?.dates}
            onChange={(e) => {
              const next = [...form.experience];
              next[0] = { ...next[0], dates: e.target.value };
              updateForm({ experience: next });
            }}
            placeholder="Dates (e.g., Jun 2023 – Aug 2024)"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.experience[0]?.duties?.join(', ') || ''}
            onChange={(e) => {
              const next = [...form.experience];
              next[0] = {
                ...next[0],
                duties: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              };
              updateForm({ experience: next });
            }}
            placeholder="Responsibilities (comma separated)"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.experience[0]?.achievements?.join(', ') || ''}
            onChange={(e) => {
              const next = [...form.experience];
              next[0] = {
                ...next[0],
                achievements: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              };
              updateForm({ experience: next });
            }}
            placeholder="Achievements (comma separated)"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Projects</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.projects[0]?.name}
            onChange={(e) => {
              const next = [...form.projects];
              next[0] = { ...next[0], name: e.target.value };
              updateForm({ projects: next });
            }}
            placeholder="Project name"
          />
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.projects[0]?.description}
            onChange={(e) => {
              const next = [...form.projects];
              next[0] = { ...next[0], description: e.target.value };
              updateForm({ projects: next });
            }}
            placeholder="Not sure what to write? Example: Planned a class fundraiser and tracked a $250 budget."
            rows={3}
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.projects[0]?.bullets?.join(', ') || ''}
            onChange={(e) => {
              const next = [...form.projects];
              next[0] = {
                ...next[0],
                bullets: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              };
              updateForm({ projects: next });
            }}
            placeholder="Project highlights (comma separated)"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Volunteer Experience</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.volunteer[0]?.org}
            onChange={(e) => {
              const next = [...form.volunteer];
              next[0] = { ...next[0], org: e.target.value };
              updateForm({ volunteer: next });
            }}
            placeholder="Organization"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.volunteer[0]?.role}
            onChange={(e) => {
              const next = [...form.volunteer];
              next[0] = { ...next[0], role: e.target.value };
              updateForm({ volunteer: next });
            }}
            placeholder="Role"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.volunteer[0]?.dates}
            onChange={(e) => {
              const next = [...form.volunteer];
              next[0] = { ...next[0], dates: e.target.value };
              updateForm({ volunteer: next });
            }}
            placeholder="Dates (optional)"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.volunteer[0]?.bullets?.join(', ') || ''}
            onChange={(e) => {
              const next = [...form.volunteer];
              next[0] = {
                ...next[0],
                bullets: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              };
              updateForm({ volunteer: next });
            }}
            placeholder="Volunteer highlights (comma separated)"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Certifications</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.certifications.join(', ')}
            onChange={(e) =>
              updateForm({
                certifications: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Example: OSHA-10, CPR"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Links</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.profile.linkedIn}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, linkedIn: e.target.value },
              })
            }
            placeholder="LinkedIn URL"
          />
          <input
            className="w-full p-2 border rounded-md mt-2"
            value={form.profile.portfolio}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, portfolio: e.target.value },
              })
            }
            placeholder="Portfolio URL"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">
            Job Posting (optional)
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.jobPostingText}
            onChange={(e) => updateForm({ jobPostingText: e.target.value })}
            placeholder="Paste a job post here to align keywords."
            rows={4}
          />
        </div>
      </div>
    )}
    buildPayload={(form) => ({
      ...form,
      skills: form.skills,
      certifications: form.certifications,
    })}
    reviewConfig={{
      endpoint: '/api/workforce/resume-score',
      label: 'Score Resume',
      payload: (docPack) => ({
        resumeText: docPack.fullText,
        template: 'entry_level',
        targetRole: docPack.targetRole || '',
      }),
    }}
    bulletUpgradeConfig={{
      endpoint: '/api/workforce/bullet-upgrade',
      label: 'Upgrade Bullets',
    }}
  />
);

const CoverLetterWizard = ({ apiBase, userId, onBack }) => (
  <DocTool
    docType="cover_letter"
    apiBase={apiBase}
    userId={userId}
    onBack={onBack}
    formDefaults={{
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cityState: '',
      },
      targetRole: '',
      targetCompany: '',
      whyCompany: '',
      topSkills: [],
      achievement: '',
      availability: '',
      preferredContact: '',
      jobPostingText: '',
      highlights: [],
      tone: 'professional',
      length: 'standard',
    }}
    quickFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.profile.firstName}
            onChange={(e) =>
              updateForm({
                profile: { ...form.profile, firstName: e.target.value },
              })
            }
            placeholder="Example: Taylor"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Why this company?</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.whyCompany}
            onChange={(e) => updateForm({ whyCompany: e.target.value })}
            placeholder="Example: I value your focus on community service and growth opportunities."
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">
            Top skills (comma separated)
          </label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.topSkills.join(', ')}
            onChange={(e) =>
              updateForm({
                topSkills: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Example: Customer service, Teamwork"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Target Role</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.targetRole}
            onChange={(e) => updateForm({ targetRole: e.target.value })}
            placeholder="Example: Office Assistant"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Company</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.targetCompany}
            onChange={(e) => updateForm({ targetCompany: e.target.value })}
            placeholder="Example: Northside Clinic"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Achievement example</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.achievement}
            onChange={(e) => updateForm({ achievement: e.target.value })}
            placeholder="Example: Resolved 20+ customer requests daily while maintaining 95% satisfaction."
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Availability</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.availability}
            onChange={(e) => updateForm({ availability: e.target.value })}
            placeholder="Example: Available evenings and weekends"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Preferred contact</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.preferredContact}
            onChange={(e) => updateForm({ preferredContact: e.target.value })}
            placeholder="Example: Email or phone"
          />
        </div>
      </div>
    )}
    advancedFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">
            Highlights (comma separated)
          </label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.highlights.join(', ')}
            onChange={(e) =>
              updateForm({
                highlights: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Example: Customer service award, Team leadership"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">
            Job Posting (optional)
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.jobPostingText}
            onChange={(e) => updateForm({ jobPostingText: e.target.value })}
            placeholder="Paste job posting to align keywords."
            rows={4}
          />
        </div>
      </div>
    )}
    buildPayload={(form) => ({ ...form })}
    reviewConfig={{
      endpoint: '/api/workforce/cover-letter-review',
      label: 'Review Cover Letter',
      payload: (docPack) => ({
        letterText: docPack.fullText,
        template: 'standard',
        targetRole: docPack.targetRole || '',
        targetCompany: docPack.targetCompany || '',
      }),
    }}
  />
);

const ThankYouWizard = ({ apiBase, userId, onBack }) => (
  <DocTool
    docType="thank_you"
    apiBase={apiBase}
    userId={userId}
    onBack={onBack}
    formDefaults={{
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cityState: '',
      },
      interviewerName: '',
      interviewerUnknown: false,
      company: '',
      role: '',
      discussionPoints: [],
      fitProof: '',
      tone: 'warm',
      format: 'email',
    }}
    quickFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Interviewer Name</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.interviewerName}
            onChange={(e) => updateForm({ interviewerName: e.target.value })}
            placeholder="Example: Ms. Alvarez"
            disabled={form.interviewerUnknown}
          />
          <label className="flex items-center gap-2 text-xs text-slate-600 mt-2">
            <input
              type="checkbox"
              checked={form.interviewerUnknown}
              onChange={(e) =>
                updateForm({
                  interviewerUnknown: e.target.checked,
                  interviewerName: e.target.checked ? '' : form.interviewerName,
                })
              }
            />
            Not addressed yet (N/A)
          </label>
        </div>
        <div>
          <label className="text-sm font-semibold">Company</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
            placeholder="Example: City Hospital"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Role</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.role}
            onChange={(e) => updateForm({ role: e.target.value })}
            placeholder="Example: Customer Service Rep"
          />
        </div>
      </div>
    )}
    advancedFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">
            Discussion points (comma separated)
          </label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.discussionPoints.join(', ')}
            onChange={(e) =>
              updateForm({
                discussionPoints: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Example: Training timeline, Team schedule"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Fit proof</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.fitProof}
            onChange={(e) => updateForm({ fitProof: e.target.value })}
            placeholder="Example: Highlight a moment that shows you are a great fit."
            rows={3}
          />
        </div>
      </div>
    )}
    buildPayload={(form) => ({
      profile: form.profile,
      interviewerName: form.interviewerName,
      company: form.company,
      role: form.role,
      discussionPoints: form.discussionPoints,
      fitProof: form.fitProof,
      tone: form.tone,
      format: form.format,
    })}
    reviewConfig={{
      endpoint: '/api/workforce/thank-you-review',
      label: 'Review Thank You',
      payload: (docPack) => ({
        letterText: docPack.fullText,
        tone: docPack.tone,
      }),
    }}
  />
);

const ResignationWizard = ({ apiBase, userId, onBack }) => (
  <DocTool
    docType="resignation"
    apiBase={apiBase}
    userId={userId}
    onBack={onBack}
    formDefaults={{
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cityState: '',
      },
      managerName: '',
      managerUnknown: false,
      company: '',
      lastDay: '',
      reason: '',
      transitionPlan: [],
      tone: 'professional',
      format: 'email',
    }}
    quickFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Manager Name</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.managerName}
            onChange={(e) => updateForm({ managerName: e.target.value })}
            placeholder="Example: Mr. Chen"
            disabled={form.managerUnknown}
          />
          <label className="flex items-center gap-2 text-xs text-slate-600 mt-2">
            <input
              type="checkbox"
              checked={form.managerUnknown}
              onChange={(e) =>
                updateForm({
                  managerUnknown: e.target.checked,
                  managerName: e.target.checked ? '' : form.managerName,
                })
              }
            />
            Not addressed yet (N/A)
          </label>
        </div>
        <div>
          <label className="text-sm font-semibold">Company</label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
            placeholder="Example: Greenline Foods"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Last Day</label>
          <input
            className="w-full p-2 border rounded-md"
            type="date"
            value={form.lastDay}
            onChange={(e) => updateForm({ lastDay: e.target.value })}
          />
        </div>
      </div>
    )}
    advancedFields={({ form, updateForm }) => (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Reason (optional)</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={form.reason}
            onChange={(e) => updateForm({ reason: e.target.value })}
            placeholder="Example: Pursuing a new opportunity."
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">
            Transition plan (comma separated)
          </label>
          <input
            className="w-full p-2 border rounded-md"
            value={form.transitionPlan.join(', ')}
            onChange={(e) =>
              updateForm({
                transitionPlan: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Example: Train replacement, Document tasks"
          />
        </div>
      </div>
    )}
    buildPayload={(form) => ({
      profile: form.profile,
      managerName: form.managerName,
      company: form.company,
      lastDay: form.lastDay,
      reason: form.reason || null,
      transitionPlan: form.transitionPlan,
      tone: form.tone,
      format: form.format,
    })}
    reviewConfig={{
      endpoint: '/api/workforce/resignation-review',
      label: 'Review Resignation',
      payload: (docPack) => ({
        letterText: docPack.fullText,
        tone: docPack.tone,
      }),
    }}
  />
);

export function CareerDocumentStudio({ userId, apiBase, onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  if (activeTool) {
    const sharedProps = { apiBase, userId, onBack: () => setActiveTool(null) };
    switch (activeTool) {
      case 'resume':
        return <ResumeWizard {...sharedProps} />;
      case 'cover_letter':
        return <CoverLetterWizard {...sharedProps} />;
      case 'thank_you':
        return <ThankYouWizard {...sharedProps} />;
      case 'resignation':
        return <ResignationWizard {...sharedProps} />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Career Document Studio
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          ← Back to Workforce Hub
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(DOC_TYPES).map(([key, meta]) => (
          <div
            key={key}
            className="workforce-tool-card p-4 rounded-xl border bg-white dark:bg-slate-800/70"
          >
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {meta.title}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {meta.estimate}
            </p>
            <button
              type="button"
              onClick={() => setActiveTool(key)}
              className="mt-3 px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkforceHub({ onBack, userId }) {
  const apiBase = (typeof window !== 'undefined' && window.API_BASE_URL) || '';
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="workforce-hub space-y-4">
      <div
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{ background: 'var(--subject-workforce-gradient)' }}
      >
        <header className="flex items-center justify-between p-4 text-white">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-extrabold">Workforce Readiness</h2>
          <div className="w-[80px]" aria-hidden="true" />
        </header>
      </div>

      {!activeTool && (
        <>
          <div
            className="rounded-2xl border p-5 text-center"
            style={{
              background: 'var(--subject-workforce-gradient)',
              color: 'var(--subject-workforce-text)',
              borderColor: 'var(--subject-workforce-border)',
            }}
          >
            <h1 className="text-2xl font-extrabold">Career Document Studio</h1>
            <p className="opacity-90 mt-2">
              Generate resumes, cover letters, thank-you notes, and resignation
              letters in minutes.
            </p>
            <button
              type="button"
              onClick={() => setActiveTool('career-docs')}
              className="mt-4 px-5 py-2 rounded-md bg-white text-teal-700 font-semibold"
            >
              Open Studio
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="workforce-tool-card p-4 rounded-xl border bg-white dark:bg-slate-800/70">
              <div className="text-base font-bold">Resume Scoring</div>
              <p className="text-sm text-slate-600 mt-1">
                Score and improve your resume draft.
              </p>
              <button
                type="button"
                onClick={() => setActiveTool('career-docs')}
                className="mt-3 px-4 py-2 rounded-md border border-teal-600 text-teal-700 font-semibold"
              >
                Use Studio
              </button>
            </div>
            <div className="workforce-tool-card p-4 rounded-xl border bg-white dark:bg-slate-800/70">
              <div className="text-base font-bold">Cover Letter Review</div>
              <p className="text-sm text-slate-600 mt-1">
                Get quick feedback on your letter.
              </p>
              <button
                type="button"
                onClick={() => setActiveTool('career-docs')}
                className="mt-3 px-4 py-2 rounded-md border border-teal-600 text-teal-700 font-semibold"
              >
                Use Studio
              </button>
            </div>
          </div>
        </>
      )}

      {activeTool === 'career-docs' && (
        <CareerDocumentStudio
          userId={userId}
          apiBase={apiBase}
          onBack={() => setActiveTool(null)}
        />
      )}
    </div>
  );
}
