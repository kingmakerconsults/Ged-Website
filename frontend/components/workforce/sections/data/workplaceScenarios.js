// Workplace Skills Sims — branching scenarios. Each scenario is a graph
// of nodes (id -> { scene, choices: [{ label, next, score, feedback }] }).
// Terminal nodes have choices: [] and a `summary`.

export const SCENARIOS = [
  {
    id: 'conflict',
    title: 'Workplace Conflict',
    intro:
      'A coworker, Jordan, has been taking credit for your ideas in team meetings. It happened again today on a project you led.',
    startNode: 'start',
    nodes: {
      start: {
        scene:
          'You walk back to your desk after the meeting. Jordan just claimed your idea about reorganizing the inventory process. You feel angry but also unsure what to do.',
        choices: [
          {
            label: 'Confront Jordan loudly in the open office',
            next: 'loud_confront',
            score: 0,
          },
          {
            label: 'Schedule a private 1:1 with Jordan',
            next: 'private_1on1',
            score: 10,
          },
          {
            label: 'Email your manager immediately to complain',
            next: 'email_mgr',
            score: 3,
          },
          {
            label: 'Say nothing and hope it stops',
            next: 'do_nothing',
            score: 1,
          },
        ],
      },
      loud_confront: {
        scene:
          'Jordan gets defensive and the whole office hears. Your manager pulls YOU aside afterward to ask what happened.',
        choices: [
          {
            label:
              'Apologize for the public outburst and ask for a private follow-up',
            next: 'recover',
            score: 4,
            feedback:
              'Good recovery — owning the misstep keeps your credibility.',
          },
          {
            label: 'Defend your outburst as justified',
            next: 'end_bad',
            score: 0,
            feedback: 'Even when wronged, public escalation usually backfires.',
          },
        ],
      },
      private_1on1: {
        scene:
          'Jordan apologizes and says they didn\u2019t realize they were doing it. They offer to publicly correct the record next meeting.',
        choices: [
          {
            label: 'Accept the apology and the correction',
            next: 'end_great',
            score: 8,
            feedback:
              'Direct + private + good-faith assumption is the textbook play.',
          },
          {
            label: 'Demand they email the whole team apologizing',
            next: 'overreach',
            score: 2,
            feedback:
              'A public shaming after a private apology damages future trust.',
          },
        ],
      },
      email_mgr: {
        scene:
          'Your manager replies: "Have you talked to Jordan directly first?" They want you to try the direct conversation before they get involved.',
        choices: [
          {
            label: 'Schedule a private 1:1 with Jordan',
            next: 'private_1on1',
            score: 6,
          },
          {
            label: 'Push back and insist the manager intervene',
            next: 'end_bad',
            score: 0,
            feedback:
              'Skipping the direct conversation looks like you can\u2019t handle peer issues.',
          },
        ],
      },
      do_nothing: {
        scene:
          'Two weeks later it happens again. Now you\u2019re even more frustrated and a quieter coworker comments that "Jordan does that to everyone."',
        choices: [
          {
            label: 'Schedule a private 1:1 with Jordan',
            next: 'private_1on1',
            score: 5,
          },
          {
            label: 'Continue avoiding it',
            next: 'end_bad',
            score: 0,
            feedback: 'Patterns rarely fix themselves. Resentment grows.',
          },
        ],
      },
      recover: {
        scene:
          'You meet with Jordan calmly the next day. They acknowledge the pattern and agree to credit you in writing going forward.',
        choices: [],
        summary:
          'You recovered from a misstep and resolved the underlying issue. Credibility intact.',
      },
      overreach: {
        scene:
          'Jordan does it but resents you. The team feels the awkwardness for weeks.',
        choices: [],
        summary:
          'You won the battle and lost the working relationship. Aim for proportional responses.',
      },
      end_great: {
        scene:
          'Next meeting Jordan opens by crediting your work. The team notices. Your manager privately thanks you for handling it well.',
        choices: [],
        summary:
          'Best outcome. You assumed good intent, addressed it directly and privately, and kept the relationship.',
      },
      end_bad: {
        scene:
          'Trust is damaged. Future collaboration with Jordan and likely others is harder.',
        choices: [],
        summary: 'Outcome could have been better. Try the scenario again.',
      },
    },
  },

  {
    id: 'customer',
    title: 'Customer Escalation',
    intro:
      'A customer is shouting at you because their order was wrong. You can see the issue is real but they are also being rude.',
    startNode: 'start',
    nodes: {
      start: {
        scene:
          '"This is the third time you people have screwed this up! I want my money back AND a free meal!" The customer is loud enough that other diners are looking.',
        choices: [
          {
            label: 'Apologize calmly and acknowledge the frustration',
            next: 'apologize',
            score: 8,
          },
          {
            label:
              'Defend the staff: "We don\u2019t make these mistakes often"',
            next: 'defend',
            score: 0,
          },
          {
            label: 'Get a manager immediately without saying anything',
            next: 'silent_get_mgr',
            score: 4,
          },
          {
            label: 'Match their tone to take control',
            next: 'match_tone',
            score: 0,
          },
        ],
      },
      apologize: {
        scene:
          'You say: "I\u2019m really sorry — that\u2019s frustrating, especially the third time. Let me make this right." The customer\u2019s volume drops one notch.',
        choices: [
          {
            label: 'Offer a refund AND a comped meal on the spot',
            next: 'overcomp',
            score: 5,
            feedback: 'Generous, but you may not have authority. Check first.',
          },
          {
            label: 'Offer a refund and ask the manager about a comped meal',
            next: 'good_path',
            score: 9,
            feedback: 'You de-escalated and stayed within your authority.',
          },
          {
            label: 'Just refund and move on',
            next: 'minimal',
            score: 4,
            feedback:
              'Adequate but a small extra gesture often turns this around.',
          },
        ],
      },
      defend: {
        scene:
          'The customer becomes louder. "Are you calling me a liar?" Other tables are now openly watching.',
        choices: [
          {
            label: 'Apologize and reset',
            next: 'apologize',
            score: 4,
            feedback: 'Good recovery, but you lost ground.',
          },
          { label: 'Get the manager', next: 'silent_get_mgr', score: 3 },
        ],
      },
      silent_get_mgr: {
        scene:
          'The manager asks what happened. You explain. They\u2019d prefer you handle it first since you were closest to the situation.',
        choices: [
          {
            label: 'Go back and try the calm-apology approach',
            next: 'apologize',
            score: 5,
          },
          {
            label: 'Insist the manager handle it',
            next: 'end_bad',
            score: 1,
            feedback:
              'Escalating before trying yourself reads as conflict-avoidance.',
          },
        ],
      },
      match_tone: {
        scene:
          'The argument explodes. The customer films you. The video lands on social media that night.',
        choices: [],
        summary:
          'Worst case. Matching customer hostility almost never ends well — and now there\u2019s a public record.',
      },
      overcomp: {
        scene:
          'Manager later corrects you that you weren\u2019t supposed to comp meals without approval.',
        choices: [],
        summary:
          'Customer happy, but you exceeded your authority. Know your comp limits before offering.',
      },
      good_path: {
        scene:
          'Customer calms down, accepts the refund, and the manager approves a free dessert. Customer leaves saying they\u2019ll come back.',
        choices: [],
        summary:
          'Excellent. De-escalated, owned the issue, and stayed within your authority.',
      },
      minimal: {
        scene:
          'Customer accepts the refund but leaves visibly annoyed. May not return.',
        choices: [],
        summary: 'OK outcome — issue resolved, relationship not repaired.',
      },
      end_bad: {
        scene:
          'Manager handles it but gives you feedback later about not de-escalating yourself.',
        choices: [],
        summary:
          'Try again — the goal is to resolve issues at the lowest level possible.',
      },
    },
  },

  {
    id: 'ethics',
    title: 'Ethics: The Timesheet',
    intro:
      'Your coworker Sam asks you to clock them in tomorrow morning because they\u2019ll be 30 minutes late. They\u2019ve done it for you before.',
    startNode: 'start',
    nodes: {
      start: {
        scene:
          '"Come on, you owe me one — and the boss never checks." Sam is your friend and they did cover you that one time.',
        choices: [
          { label: 'Agree to clock them in', next: 'agree', score: 0 },
          { label: 'Decline and explain why', next: 'decline', score: 8 },
          {
            label: 'Offer to remind them but not clock them',
            next: 'middle',
            score: 6,
          },
        ],
      },
      agree: {
        scene:
          'You clock Sam in. Two weeks later HR audits time records and notices the badge swipe time vs. system time mismatch.',
        choices: [
          {
            label: 'Tell HR the truth immediately',
            next: 'come_clean',
            score: 4,
            feedback: 'Honesty is now damage control.',
          },
          {
            label: 'Lie and say it was a mistake',
            next: 'end_terrible',
            score: 0,
            feedback: 'Time fraud + lying to HR = often a fireable offense.',
          },
        ],
      },
      decline: {
        scene:
          'Sam is annoyed but you explain: "I get it, but timesheet fraud is grounds for termination — for both of us." Sam grudgingly agrees.',
        choices: [
          {
            label: 'Suggest Sam call the manager directly to give a heads-up',
            next: 'good',
            score: 9,
          },
          { label: 'Just leave it', next: 'minimal', score: 5 },
        ],
      },
      middle: {
        scene:
          'Sam agrees to handle it themselves. They text the manager early and arrive 25 minutes late.',
        choices: [],
        summary:
          'OK — you protected yourself but didn\u2019t fully coach Sam on the right play.',
      },
      come_clean: {
        scene:
          'You\u2019re given a written warning. Sam is fired. Painful lesson but you kept your job.',
        choices: [],
        summary:
          'You survived but barely. Doing the wrong favor for a friend cost you both.',
      },
      end_terrible: {
        scene:
          'Both of you are terminated for cause and the dishonesty makes finding the next job harder.',
        choices: [],
        summary: 'Worst case. Always tell the truth in HR investigations.',
      },
      good: {
        scene:
          'Sam calls the manager, owns the lateness, and arrives only 20 minutes late. No timesheet issue, no drama.',
        choices: [],
        summary:
          'Best outcome. You upheld integrity AND helped Sam handle it correctly.',
      },
      minimal: {
        scene: 'Sam handles it, somewhat awkwardly, but no harm done.',
        choices: [],
        summary:
          'Solid — you stayed clean. A coaching nudge would have been even better.',
      },
    },
  },

  {
    id: 'feedback',
    title: 'Receiving Hard Feedback',
    intro:
      'Your manager just told you in your 1:1 that your customer-service scores are below team average and you need to improve in 30 days.',
    startNode: 'start',
    nodes: {
      start: {
        scene:
          'You feel defensive. You think the scoring is unfair — you\u2019ve had several rude customers this month.',
        choices: [
          {
            label: 'Argue that the scores are unfair',
            next: 'argue',
            score: 1,
          },
          {
            label: 'Ask for specific examples and a clear improvement plan',
            next: 'curious',
            score: 9,
          },
          {
            label: 'Stay silent, nod, leave the meeting',
            next: 'silent',
            score: 3,
          },
          {
            label: 'Cry and ask for an extension on the 30 days',
            next: 'cry',
            score: 2,
          },
        ],
      },
      argue: {
        scene:
          'Manager doubles down: "I\u2019ve listened to your calls. The pattern is clear." Tension rises.',
        choices: [
          {
            label: 'Calm down and ask for examples',
            next: 'curious',
            score: 5,
            feedback: 'Recovery is possible. Curiosity beats defensiveness.',
          },
          { label: 'Continue arguing', next: 'end_bad', score: 0 },
        ],
      },
      curious: {
        scene:
          'Manager pulls up two specific calls and walks you through them. You see the pattern: you interrupt customers when they vent.',
        choices: [
          {
            label: 'Ask for a 1-page action plan you can practice',
            next: 'great',
            score: 9,
          },
          {
            label: 'Promise to "just do better"',
            next: 'minimal',
            score: 4,
            feedback: 'Vague promises don\u2019t produce change.',
          },
        ],
      },
      silent: {
        scene:
          'You leave without a clear plan. A week later you realize you don\u2019t know what to actually change.',
        choices: [
          { label: 'Ask for a follow-up meeting', next: 'curious', score: 5 },
          { label: 'Hope it works out', next: 'end_bad', score: 0 },
        ],
      },
      cry: {
        scene:
          'Manager softens but the issue isn\u2019t resolved. They suggest you take a moment and come back tomorrow.',
        choices: [
          {
            label: 'Come back tomorrow and ask for examples',
            next: 'curious',
            score: 4,
          },
        ],
      },
      great: {
        scene:
          'You and the manager agree on 3 specific behaviors to practice and a check-in in 2 weeks. After 30 days your scores are above team average.',
        choices: [],
        summary:
          'Best outcome. Curiosity + action plan + practice = visible improvement.',
      },
      minimal: {
        scene:
          'You improve a little but not enough. Manager gives you another verbal warning.',
        choices: [],
        summary:
          'OK — you\u2019re still in the job, but missed a chance to grow.',
      },
      end_bad: {
        scene: 'You\u2019re put on a formal Performance Improvement Plan.',
        choices: [],
        summary:
          'Defensiveness in feedback conversations almost always escalates the issue.',
      },
    },
  },
];
