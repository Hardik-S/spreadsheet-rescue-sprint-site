export function buildMailtoHref(email, subject, bodyLines = []) {
  const query = [];

  if (subject) {
    query.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (bodyLines.length > 0) {
    query.push(`body=${encodeURIComponent(bodyLines.join('\r\n'))}`);
  }

  return `mailto:${email}${query.length > 0 ? `?${query.join('&')}` : ''}`;
}

export function resolveSecondaryAction(cta, contact, primaryHref = null) {
  if (cta.calendarUrl) {
    return {
      href: cta.calendarUrl,
      label: contact.calendarLabel || cta.secondaryLabel,
      isExternal: true
    };
  }

  if (cta.secondaryEmail && primaryHref) {
    const [, query = ''] = primaryHref.split('?');
    const secondaryHref = `mailto:${cta.secondaryEmail}${query ? `?${query}` : ''}`;

    return {
      href: secondaryHref,
      label: cta.secondaryLabel,
      isExternal: false
    };
  }

  return {
    href: cta.contactAnchor || '#contact',
    label: cta.secondaryLabel,
    isExternal: false
  };
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildFitExamples(examples) {
  return examples.map((example) => `<li>${escapeHtml(example)}</li>`).join('');
}
