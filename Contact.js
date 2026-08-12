import { useTitle } from "../hooks/useTitle";

const contactLinks = [
  {
    name: "Instagram",
    handle: "Mayur Suraywanshi",
    href: "https://www.instagram.com/mayur_suraywanshi/",
    color: "from-pink-500 to-orange-400",
  },
  {
    name: "LinkedIn",
    handle: "Mayur Surywanshi",
    href: "https://www.linkedin.com/in/mayur-surywanshi/",
    color: "from-blue-700 to-blue-500",
  },
  {
    name: "GitHub",
    handle: "Mayur Suryawanshi",
    href: "https://github.com/mayursurywanshi",
    color: "from-gray-900 to-gray-600",
  },
  {
    name: "Email",
    handle: "surywanshi.mr@gmail.com",
    href: "mailto:surywanshi.mr@gmail.com",
    color: "from-red-600 to-orange-400",
    action: "Send Email",
  },
  {
    name: "Phone",
    handle: "+91 - 7066676086 / 9511721321",
    href: "tel:+917066676086",
    color: "from-green-700 to-green-500",
    action: "Call now",
  },
];

const ContactIcon = ({ name }) => {
  const iconClass = "h-6 w-6";

  if (name === "Instagram") {
    return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "LinkedIn") {
    return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M5.4 7.8H2.2V21h3.2V7.8zM3.8 2a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM21.8 13.4c0-4-2.1-5.9-5-5.9-2.3 0-3.4 1.3-4 2.2V7.8H9.6V21h3.2v-6.5c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5V21h3.2l1.1-7.6z" /></svg>;
  }
  if (name === "GitHub") {
    return <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.91c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0112 6.95a9.3 9.3 0 012.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.79c0 .27.18.59.69.49A10.23 10.23 0 0022 12.23C22 6.58 17.52 2 12 2z" clipRule="evenodd" /></svg>;
  }
  if (name === "Email") {
    return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
  }
  return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.69 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0122 16.92z" /></svg>;
};

export const Contact = () => {
  useTitle("Contact Us");

  return (
    <main className="contact-page flex items-center justify-center px-1 py-8 sm:px-4 sm:py-12 lg:py-16">
      <section className="w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Get in touch</p>         
           <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Connect with Mayur R. Suryawanshi through any of the platforms below.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-5 sm:mt-10">
          {contactLinks.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noreferrer"
              className="contact-card group w-full rounded-xl border border-gray-200 bg-gray-50 p-5 text-left shadow-sm dark:border-gray-600 dark:bg-gray-700 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] lg:p-6"
            >
              <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${contact.color} text-xl font-bold text-white`}>
                <ContactIcon name={contact.name} />
              </span>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">{contact.name}</h2>
              {contact.name === "Phone" ? (
                <p className="mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="indian-flag" aria-label="Indian flag">
                    <span></span><span></span><span></span>
                  </span>
                  <span>+91 -</span>
                  <span className="flex flex-col">
                    <span>7066676086</span>
                    <span>9511721321</span>
                  </span>
                </p>
              ) : (
                <p className="mt-1 break-words text-gray-600 dark:text-gray-300">{contact.handle}</p>
              )}
              <span className="mt-5 inline-block font-medium text-blue-700 dark:text-blue-300">{contact.action || "Visit profile"} &rarr;</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};
