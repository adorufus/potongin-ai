import { Project, Clip, LogEntry, Testimonial, FAQItem } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Podcast Highlight #04',
    editedTime: 'Edited 2m ago',
    status: 'PROCESSING',
    progressPercent: 42,
  },
  {
    id: 'proj-2',
    title: 'Viral Hook - Gaming Intro',
    editedTime: 'Edited 1h ago',
    status: 'READY',
    viralScore: 94,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKmLN2k5X5hFYajKGGkYIRX4K01GR3C4kXNoLWobdOL9HcyjPgenRqKS_dK2X2ongoeYZrlxRykIXgQj3PNDQpIMcV0SUI0ozY5EVDPkwaf_BGjoml_tqsgWVMBjWmABPNvx--4j4HOUrAyOCZ10etV8M0RlLP51WkABPV3w9dQhpoGrpddxZs4McQvAtTHMEZucLQitsZT3XEMmlxSUVTznC8cvkeqwptvM45Mdn9LnbJEcY7eB6MC4ww67Qvvo2SaPNuZ68bS_Jy',
  },
  {
    id: 'proj-3',
    title: 'City Skyline B-Roll',
    editedTime: 'Edited 5h ago',
    status: 'DRAFT',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALMdcN1m_-28BKz_3m6JWIscU2JG6Z3882oDg0eUH5a6RvYhepTSBvhjleVT5tdKv7G1evXdjx3HrYbfq78F0LeyFYcwmHz8DUHC9fqW27zuewSsHtST-TGddBLkxgx8tRwal14LMbmF6fkfqc1H2cwplivSgexcYTzhJchYT6Tb4DueBkM1fU1CiEKEpFE-ye9MB6hvYkeiam2DsZTB9FyoYjx1oUhhgJe1FuT_ZnLg3aRYrFML19jVW0qv1AoRWtPB73e2Nzkjhy',
  },
];

export const MOCK_CLIPS: Clip[] = [
  {
    id: 'clip-1',
    title: 'Viral Hook: The Big Reveal',
    subtitle: '"You won\'t believe what happens when we run this script..."',
    duration: '00:12 - 00:25',
    score: 98.4,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZN9izjs2GyTG7nv5QkHE9UJP5XBPv-tilamxpobcCUsUNvcgJPIBQtPb7bt3Lipjtm-NFF3T-AZHpzc0gd8O-2_vRwocjibdy9KBBFTdBxqJntIZ6CpiPqErp6LgpXTxmgU4qqyp64FzEKzyM4BtU4KyRUrVYjdXnVE2R734Flel3p9WGn6GPRYKPRyUdtUr7wuYNX2UNiqOQ4U12eO-jr7Nd7QiJ3ACuG-adc5uKcG1Y_WboSvBSd2BBO8tR3WcQ06azWT7QoUso',
    tags: ['Face Detected', 'Auto-Cap'],
    type: 'viral',
    startSec: 12,
    endSec: 25,
  },
  {
    id: 'clip-2',
    title: 'Explainer Moment',
    subtitle: '"The logic behind the algorithm is actually quite simple..."',
    duration: '01:05 - 01:28',
    score: 92.1,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJZIS5yc1np6-4EZBhlKl5JycMZahoJZb1_VcmcWqtKc16_OGA1v30CklzH7PuUprhmyuRxsTbkgliDeimXIikIt3EER-PnZbrnP88SzcR_2El7rUrvM7cpD1Uu1bl82TjsU_pkLnGTm9yif8qhBrJOb89TYHlPpO6rt_BnN8AGU8z5iS6pvf1XneuPZnb3ppCd5NkSRf8vTK-EbVliPnLgbKtk03BoZrvulrSP_o02OwbY7XWti02JpipDkyTpdaJHJMsFyaN1As',
    tags: ['Captions Ready'],
    type: 'explainer',
    startSec: 65,
    endSec: 88,
  },
  {
    id: 'clip-3',
    title: 'Mid-Point Revelation',
    subtitle: '"The scaling solution is what sets this apart..."',
    duration: '02:15 - 02:45',
    score: 84.0,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgw3dOQpHduu-mb-pWEX-IX4CQCZuPibHoXDk71-L9c0v1RC9jNHrx9kHoRCKIl-92e6vpQOVcd4e5UqOz5oiUsiX-l_xj_yqiwJrIdZuyVt5Dlpalng3nSXg7txDyBzDwy-mAkcBgSc7fe6ZNOvrX1JCMRIqnMPnlEuCTMf7WgBolxakviC7XmVAZtMiMEzrDlWwUgeJzUpye_a7OiAZVYiAI07kPJ0ck9TDnDPwXhEFR_X_4MPUT1T6wOxi0QRk4NWDSEeBuDyT',
    tags: ['Auto-Cap'],
    type: 'action',
    startSec: 135,
    endSec: 165,
  },
];

export const MOCK_SIDEBAR_CLIPS: Clip[] = [
  {
    id: 'side-clip-1',
    title: 'The Hook - High Energy',
    subtitle: 'High contrast cinematic capture of excited speech.',
    duration: '00:00 - 00:08',
    score: 98,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWfvMWm_wQ3sQqwTuH2sedH1qz21SVOdhxXTAZyKKh6N6bPO1FluqY0xpEASgw2f4hXCe55Rd0ZFWVp60b9Y5Pb65ydf3h-m15Rhd-V_llNx26gXTxRgp7ufDUyGIHWeNVLjb80PNinqBMY0m0VUboxl5gIc_7buTjcRLzq5nYPfKTd0HZBvX_9FzDA-AOqJo620gA0mHO3i24xHmT3bzgIlwHUbE3XZTZDqSoS3MHIUN8WEUyKCkA1T1b_MjEBwuB4sfWjwmAcT16',
    tags: ['Face Tracked', 'Auto-Cap'],
    type: 'viral',
    startSec: 0,
    endSec: 8,
  },
  {
    id: 'side-clip-2',
    title: 'Mid-Point Revelation',
    subtitle: 'Dramatic portrait speaker close-up.',
    duration: '02:15 - 02:45',
    score: 84,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgw3dOQpHduu-mb-pWEX-IX4CQCZuPibHoXDk71-L9c0v1RC9jNHrx9kHoRCKIl-92e6vpQOVcd4e5UqOz5oiUsiX-l_xj_yqiwJrIdZuyVt5Dlpalng3nSXg7txDyBzDwy-mAkcBgSc7fe6ZNOvrX1JCMRIqnMPnlEuCTMf7WgBolxakviC7XmVAZtMiMEzrDlWwUgeJzUpye_a7OiAZVYiAI07kPJ0ck9TDnDPwXhEFR_X_4MPUT1T6wOxi0QRk4NWDSEeBuDyT',
    tags: ['Auto-Cap'],
    type: 'explainer',
    startSec: 135,
    endSec: 165,
  },
  {
    id: 'side-clip-3',
    title: 'Call to Action End',
    subtitle: 'Futuristic digital representation of flows.',
    duration: '12:00 - 12:15',
    score: 76,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqjwab9YTurSZ5GIJGmupw8X4JiNN1oytuDqokSEAinZb4HS22QGo4rOqgkpcQcfYw5kP7ynxlev2vrPX0aYmcz8W844OxWjKN8_GLB-WEXYaRbB_LAevPy1PquIsieGYOso7LLsAASwKamAgv3_e7oMsgHf2-p9tbofscBo2cek2DDtVx5_qH3245t0IA_GrEiVbmDkY4bALqmdVhst2CC-mXbubP8e7YUcd8omTP9tiIYNV96EABZZzeNRMZSnlT8_2QMpo-Y3a6',
    tags: ['Call to Action'],
    type: 'action',
    startSec: 720,
    endSec: 735,
  }
];

export const INITIAL_LOGS: LogEntry[] = [
  { timestamp: '00:12:04', message: 'Speech-to-text alignment: SUCCESS', type: 'info' },
  { timestamp: '00:12:08', message: 'DETECTED HIGH-ENERGY HOOK AT 01:24', type: 'highlight' },
  { timestamp: '00:12:12', message: 'Auto-cropping face to 9:16 aspect ratio...', type: 'info' },
  { timestamp: '00:12:15', message: 'Generating viral captions (Style: Bold Modern)', type: 'info' },
  { timestamp: '00:12:18', message: 'Color grade application: PENDING...', type: 'warn' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your monthly or annual subscription at any time from your settings panel. If you cancel, you will still have access to your plan\'s features until the end of your current billing cycle.',
  },
  {
    id: 'faq-2',
    question: 'How does "Viral Hook Prediction" work?',
    answer: 'Our proprietary AI model analyzes retention patterns from millions of top-performing short-form videos. It scans your footage for high-energy spikes, emotional triggers, and pattern interrupts that are proven to grab attention in the first 3 seconds.',
  },
  {
    id: 'faq-3',
    question: 'Is there a free trial for the Pro plan?',
    answer: 'We don\'t offer a traditional trial, but our Free plan allows you to test the core clipping engine. The Creator Pro plan is backed by a 7-day satisfaction guarantee—if you don\'t love it, we will refund you.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Alex Rivera',
    role: 'Twitch Streamer & YouTuber',
    quote: '"Potongin.ai literally saved me 20 hours a week. The hook prediction is scarily accurate—my last 5 shorts all went over 100k views."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVJ055sNokMW38hW4RUXxEAFRgAFJyRaPEbutbFWYpD-XJhjRzAexgBF9jV1SDJ1ib6E5FfETzYtwrE28R_UVA5QEnDoEUTrdQBd1s1S3FmXBp7jxse7jF9hTc_PlfWeHcqJU7bpSqprovAvJEMhNPUZdbaL6KOBetDpNl6aIvniZtjlzzaWFmgYIgOBy-4OvorDmTjSrot3fg1ojH7YXW_4rPTEG5oaJ1Qcw8sxcerJLq0qjb2HVB80sufjkJdKfsHwQuM_YUf-PP',
  },
  {
    name: 'Sarah Chen',
    role: 'Social Media Manager',
    quote: '"The Enterprise API allows our agency to process thousands of clips for our clients instantly. It\'s the only AI tool that actually understands pacing."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRfyGzb-jXMsM9LEHqcUowv5cySRD5ne0m1NMC9NVALm-ZKmo4XOpYKSuCult6q0ovQnr9TEzSxE2Uo74WL4MbmKzDhDKMQ5ckg3niTaFZvCunTNnGkiwsMcFT-V89awtA9jOBnASZLm19jMpyBnwdFvroWtplH97YU_rV1WtryyfiiEnc7XxMEdD6YLTmHJS8aqWjvowSvSToy-n4t3yQHsKi-XjU_LcZQ4O7PGcnS5BfJTtGlJoOfYBT0i7U-O-lcC4d0BlgA5PI',
  },
];
