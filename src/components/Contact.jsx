export default function Contact({ contact }) {
  const links = [
    { href: `mailto:${contact.email}`, label: `✉ ${contact.email}` },
    { href: contact.linkedin, label: 'in · LinkedIn', ext: true },
    { href: contact.github, label: '⌥ GitHub', ext: true },
    { href: `tel:${contact.phone.replace(/\s/g, '')}`, label: `☏ ${contact.phone}` },
  ];

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="section-label reveal">06 · transfer window open</div>
        <h2 className="contact-h2 reveal" data-delay="1">
          Let’s <span className="grad">ship</span>
          <br />
          something real.
        </h2>
        <p className="contact-lead reveal" data-delay="2">
          Building something ambitious with AI, the web, or both? I’m quick to respond and faster to
          deliver.
        </p>
        <div className="contact-links reveal" data-delay="3">
          {links.map(({ href, label, ext }) => (
            <a
              key={href}
              href={href}
              target={ext ? '_blank' : undefined}
              rel={ext ? 'noopener noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
