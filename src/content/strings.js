// content/strings.js
// Responsibility: all user-facing English text + navigation config.
// No HTML, no logic. Just data.

export const SITE = {
  name: "Chart Lab",
  tagline: "Turn numbers into charts in seconds.",
  description:
    "Free chart generator. No sign-up needed. Create bar, line, pie, area, stacked, donut, scatter, and radar charts — download as SVG or PNG.",
  url: "https://www.chart-lab.workers.dev",
  logoUrl: "/logo.svg",
  githubUrl: "https://github.com/Ramadan-ibrahim-eg/chart-lab",
};

export const NAV = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/privacy", label: "Privacy" },
  { path: "/cookies", label: "Cookies" },
  { path: "/terms", label: "Terms" },
];

export const FOOTER_NOTE = `© ${new Date().getFullYear()} Chart Lab. All rights reserved.`;

// Ad slots — placeholders for now. No external scripts.
export const AD_SLOTS = {
  top: { label: "Advertisement", height: 60 },
  bottom: { label: "Advertisement", height: 60 },
};

// Chart types shown in the form.
export const CHART_TYPES = [
  { value: "bar",         label: "Bar",         description: "Compare values across categories." },
  { value: "line",        label: "Line",        description: "Show trends over time." },
  { value: "pie",         label: "Pie",         description: "Show parts of a whole." },
  { value: "area",        label: "Area",        description: "Like line, but filled." },
  { value: "stacked-bar", label: "Stacked Bar", description: "Compare totals and their parts." },
  { value: "donut",       label: "Donut",       description: "Like pie, with a hole." },
  { value: "scatter",     label: "Scatter",     description: "Show relationships between two variables." },
  { value: "radar",       label: "Radar",       description: "Compare multiple variables on a circular grid." },
];

// Customization options for the collapsible section.
export const CUSTOMIZE_OPTIONS = [
  { name: "pointStyle", type: "select", label: "Point style",
    options: [
      { value: "circle", label: "Circle" },
      { value: "square", label: "Square" },
      { value: "star",   label: "Star" },
      { value: "emoji",  label: "Emoji" },
      { value: "none",   label: "None" },
    ] },
  { name: "pointSize", type: "range", label: "Point size", min: 2, max: 10, default: 4 },
  { name: "lineWidth", type: "range", label: "Line width", min: 1, max: 5, default: 2 },
  { name: "borderRadius", type: "range", label: "Border radius", min: 0, max: 32, default: 0 },
  { name: "bgStyle", type: "select", label: "Background",
    options: [
      { value: "none", label: "None" },
      { value: "dots", label: "Dots" },
      { value: "grid", label: "Grid" },
      { value: "snow", label: "Snow" },
    ] },
  { name: "showValues", type: "checkbox", label: "Show data values", default: true },
];

// Landing page content — all English, problem-solving tone.
export const LANDING = {
  hero: {
    title: "Turn your numbers into a chart in seconds.",
    subtitle:
      "No sign-up. Free forever. Chart Lab turns raw numbers into clean, professional charts you can download as SVG or PNG.",
    note: "Your numbers are sent to a chart service to draw the chart. No account needed.",
  },
  howItWorks: [
    { title: "Choose a chart type", description: "Pick from 8 chart types — bar, line, pie, and more." },
    { title: "Enter your data", description: "Type your numbers separated by commas. Add labels if you want." },
    { title: "Download", description: "Get your chart as SVG or PNG. Use it anywhere." },
  ],
  why: [
    { title: "No sign-up", description: "No account, no email, no password. Just create and download." },
    { title: "No saved charts", description: "No accounts and no database. Your numbers are sent to a chart service to draw the picture, and short-lived technical copies, such as a cache of up to one hour, may exist." },
    { title: "Free forever", description: "No payment, no hidden limits. Use it as much as you want." },
    { title: "8 chart types", description: "Bar, line, pie, area, stacked bar, donut, scatter, and radar." },
  ],
  chartTypes: [
    { label: "Bar", description: "Compare values across categories." },
    { label: "Line", description: "Show trends over time." },
    { label: "Pie", description: "Show parts of a whole." },
    { label: "Area", description: "Like line, but filled." },
    { label: "Stacked Bar", description: "Compare totals and their parts." },
    { label: "Donut", description: "Like pie, with a hole." },
    { label: "Scatter", description: "Show relationships between variables." },
    { label: "Radar", description: "Compare multiple variables." },
  ],
  faq: [
    {
      question: "Is Chart Lab really free?",
      answer: "Yes. No sign-up, no payment, no hidden limits.",
    },
    {
      question: "Do you store my data?",
      answer: "Chart Lab has no accounts and no database, so your charts are not saved to a profile. To draw a chart, your numbers and labels are sent to a chart service (Divctor). The finished chart is cached for up to one hour, and the services involved may keep their own technical records under their own policies. See the Privacy page for details.",
    },
    {
      question: "What chart types can I create?",
      answer: "8 types: bar, line, pie, area, stacked bar, donut, scatter, and radar.",
    },
    {
      question: "Can I use the charts commercially?",
      answer: "Yes. The SVG and PNG files are yours to use anywhere, for any purpose.",
    },
  ],
};
