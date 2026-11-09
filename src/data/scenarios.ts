import type { Effects, Scenario } from '@/core/types'

/** Effects in the order: technical, risk, collaboration, survival. */
const fx = (technical: number, risk: number, collaboration: number, survival: number): Effects => ({
  technical,
  risk,
  collaboration,
  survival,
})

export const scenarios: Scenario[] = [
  {
    id: 'friday-pr',
    title: 'The small change',
    when: 'Friday 17:58',
    situation: [
      'The office is emptying out. A teammate wants their pull request live before the weekend.',
    ],
    quote: { from: 'Your teammate', lines: ['Small change.', 'Only touched one file.'] },
    snippet: {
      filename: 'src/billing/invoice.ts',
      caption: 'Showing 1 of 38 changed files',
      stats: { additions: 742, deletions: 381 },
      lines: [
        { text: '@@ -41,9 +41,11 @@ export async function chargeCustomer(order: Order) {', tone: 'muted' },
        { text: '   const invoice = await buildInvoice(order)' },
        { text: '-  await db.invoices.insert(invoice)', tone: 'del' },
        { text: '+  await db.invoices.insert(invoice, { skipValidation: true })', tone: 'add' },
        { text: '+  // TODO: remove before merge', tone: 'add' },
        { text: "+  console.log('charging', order.customer)", tone: 'add' },
        { text: '   return gateway.charge(invoice.total)' },
        { text: ' }' },
      ],
    },
    choices: [
      {
        id: 'merge-now',
        label: 'Merge immediately',
        detail: "It's Friday. What could go wrong?",
        consequence:
          'Merged at 17:59 and deployed at 18:03. The first alert arrives at 18:07. Your weekend plans are now a pull request of their own.',
        effects: fx(-2, -3, -1, -3),
      },
      {
        id: 'wait-monday',
        label: 'Wait until Monday',
        detail: 'Production will still be there.',
        consequence:
          'You comment "Let\'s ship this on Monday." Production has a quiet weekend. By Monday the branch has 14 merge conflicts and the author has questions.',
        effects: fx(0, 2, -1, 2),
      },
      {
        id: 'second-review',
        label: 'Request another review',
        detail: 'Ask for a second pair of eyes.',
        consequence:
          'Your reviewer spots skipValidation and the stray console.log in four minutes. The PR collects 23 comments and ships on Monday, working.',
        effects: fx(1, 2, 3, 1),
      },
      {
        id: 'read-diff',
        label: 'Check the diff yourself',
        detail: 'All 742 additions. Yes, all of them.',
        consequence:
          'The one-file change is also a migration, a config rewrite and a renamed folder. You leave precise feedback and the author thanks you, eventually.',
        effects: fx(3, 2, 1, 2),
      },
    ],
  },
  {
    id: 'production-incident',
    title: 'Production incident',
    when: 'Saturday 02:14',
    situation: [
      '5xx errors are suddenly climbing and customers are reporting problems.',
      'The dashboard is mostly red. Someone in the channel types "is anyone looking at this?"',
    ],
    snippet: {
      filename: 'api-gateway.log',
      lines: [
        { text: '02:14:07 INFO  GET  /api/orders    200  41ms' },
        { text: '02:14:09 ERROR POST /api/checkout  500  3021ms', tone: 'error' },
        { text: '02:14:09 ERROR ECONNREFUSED 10.0.3.17:5432', tone: 'error' },
        { text: '02:14:10 WARN  pool exhausted (waiting: 212)', tone: 'warn' },
        { text: '02:14:11 ERROR POST /api/checkout  502  30000ms', tone: 'error' },
        { text: '02:14:12 INFO  deploy v2.41.0 finished 14 minutes ago', tone: 'muted' },
      ],
    },
    choices: [
      {
        id: 'restart-all',
        label: 'Restart everything',
        detail: 'Turn it off and on again, at scale.',
        consequence:
          'Everything restarts. For 90 seconds the graphs look beautiful. Then the errors come back, and the logs from before the restart are gone.',
        effects: fx(-2, -2, -1, -1),
      },
      {
        id: 'check-logs',
        label: 'Check logs first',
        detail: 'Understand before you act.',
        consequence:
          'You find connection pool exhaustion starting right after v2.41.0. You have a diagnosis in five minutes. Customers are still waiting for a fix.',
        effects: fx(3, 1, 0, 1),
      },
      {
        id: 'rollback',
        label: 'Rollback latest release',
        detail: 'Stop the bleeding, investigate later.',
        consequence:
          'Rolled back in four minutes. The error rate returns to baseline. The root cause investigation can happen with coffee.',
        effects: fx(2, 3, 1, 3),
      },
      {
        id: 'ask-team',
        label: 'Ask the team',
        detail: 'Open the war room.',
        consequence:
          'Six people join the call. Four have theories, one has a screenshot and someone suggests a rewrite. After 20 minutes you all agree on a rollback.',
        effects: fx(0, 1, 3, 0),
      },
    ],
  },
  {
    id: 'legacy-monster',
    title: 'The legacy monster',
    when: 'Monday 10:30',
    situation: [
      'While tracing a bug, you open a service nobody has mentioned in years.',
      'CoffeeScript. Last updated in 2016. No tests, no documentation. It still processes every order.',
    ],
    snippet: {
      filename: 'order_processor.coffee',
      caption: 'Last updated: 2016',
      lines: [
        { text: '# author: unknown', tone: 'muted' },
        { text: 'class OrderProcessor' },
        { text: '  constructor: (@db, @mailer) ->' },
        { text: '' },
        { text: '  process: (order, cb) =>' },
        { text: '    return cb() unless order?' },
        { text: '    @db.query "SELECT * FROM orders WHERE id=#{order.id}", (err, rows) =>' },
        { text: '      # TODO: fix this', tone: 'muted' },
        { text: "      @mailer.send rows[0].email, 'thanks', -> cb()" },
      ],
    },
    choices: [
      {
        id: 'rewrite',
        label: 'Rewrite everything',
        detail: 'How hard can it be?',
        consequence:
          'Six months later you maintain two systems. The old one has still never gone down. The new one has.',
        effects: fx(-2, -3, -1, -2),
      },
      {
        id: 'add-tests',
        label: 'Add tests first',
        detail: 'Pin down the behavior before changing it.',
        consequence:
          'Your tests uncover three behaviors nobody knew about, two of which customers depend on. Now you can refactor safely, one small step at a time.',
        effects: fx(3, 3, 1, 2),
      },
      {
        id: 'leave',
        label: 'Leave peacefully',
        detail: "If it isn't broken, don't look at it.",
        consequence:
          'You close the file quietly. The service keeps running. So does the SQL injection. Someone will find it eventually.',
        effects: fx(-1, -1, -2, 0),
      },
      {
        id: 'cry',
        label: 'Cry',
        detail: 'Valid. Briefly.',
        consequence:
          'You cry for ten minutes. A teammate walks by, says "oh, you found it," and sits down next to you. The service is unchanged, but you are no longer alone with it.',
        effects: fx(-1, 0, 2, 0),
      },
    ],
  },
  {
    id: 'pm-surprise',
    title: 'Product manager surprise',
    when: 'Monday 16:42',
    situation: ['A new feature is required.', 'The deadline is tomorrow morning.'],
    snippet: {
      filename: '#product-urgent',
      lines: [
        { text: 'Maya (PM)  16:42', tone: 'muted' },
        { text: 'hey, quick one!' },
        { text: 'the CEO wants live order tracking in the app' },
        { text: "for tomorrow's 9am demo. can we do it?" },
      ],
    },
    choices: [
      {
        id: 'promise',
        label: 'Promise delivery',
        detail: 'Say yes. Figure it out later.',
        consequence:
          'You say "Sure!" The scope doubles by 18:00. At 08:55 you demo a very confident loading spinner.',
        effects: fx(-1, -3, -1, -2),
      },
      {
        id: 'negotiate',
        label: 'Negotiate scope',
        detail: 'Agree on what "live tracking" means.',
        consequence:
          'You and Maya agree on order status updates, no map. The demo works. The CEO asks for the map next quarter, which is a good problem to have.',
        effects: fx(2, 2, 3, 2),
      },
      {
        id: 'all-nighter',
        label: 'Work all night',
        detail: 'Coffee, headphones, no limits.',
        consequence:
          'You ship at 06:42. You discover the bug at 06:43, by yourself, on zero hours of sleep. The demo goes fine. You do not.',
        effects: fx(-1, -2, 0, -2),
      },
      {
        id: 'mvp',
        label: 'Build MVP',
        detail: 'Ship the smallest thing that works.',
        consequence:
          'You deliver a polling endpoint and a status page. It is not elegant, but it is tested, it is real, and it holds up through the demo.',
        effects: fx(3, 1, 1, 2),
      },
    ],
  },
  {
    id: 'payment-api',
    title: 'Third-party API failure',
    when: 'Tuesday 11:05',
    situation: [
      'Your payment provider is returning random errors.',
      'About one request in five fails, with no pattern. Their status page says "All systems operational."',
    ],
    snippet: {
      filename: 'payments-worker.log',
      lines: [
        { text: 'POST /v1/charges  200 OK                  312ms' },
        { text: 'POST /v1/charges  503 Service Unavailable', tone: 'error' },
        { text: 'POST /v1/charges  200 OK                  298ms' },
        { text: 'POST /v1/charges  429 Too Many Requests', tone: 'warn' },
        { text: 'POST /v1/charges  500 {"error":"unknown"}', tone: 'error' },
      ],
    },
    choices: [
      {
        id: 'retry-forever',
        label: 'Retry forever',
        detail: 'Eventually it has to work.',
        consequence:
          "Your retries hit the provider's rate limit, which causes more failures, which causes more retries. You have built an efficient outage amplifier. Some customers get charged twice.",
        effects: fx(-3, -3, -1, -3),
      },
      {
        id: 'add-monitoring',
        label: 'Add monitoring',
        detail: "You can't fix what you can't see.",
        consequence:
          'Within the hour the dashboard shows a 19% failure rate. You now know exactly how bad it is. So do your customers.',
        effects: fx(2, 1, 1, 1),
      },
      {
        id: 'degrade-gracefully',
        label: 'Create graceful degradation',
        detail: 'Queue, back off, and tell users the truth.',
        consequence:
          'Failed charges go into a queue with exponential backoff and idempotency keys, behind a circuit breaker. Customers see "processing" instead of errors.',
        effects: fx(3, 3, 1, 3),
      },
      {
        id: 'ignore',
        label: 'Ignore it',
        detail: "It's their problem.",
        consequence:
          'It is, technically, their problem. It becomes your problem at the next revenue review.',
        effects: fx(-3, -3, -2, -3),
      },
    ],
  },
]
