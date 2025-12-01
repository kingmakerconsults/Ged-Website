import React, { useState } from 'react';

const AMENDMENTS_DB = [
  {
    id: '1st',
    topic: 'Freedoms',
    simple: 'Freedom of speech, religion, press, assembly, and petition.',
    original:
      'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    id: '2nd',
    topic: 'Arms',
    simple: 'Right to keep and bear arms (own guns).',
    original:
      'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    id: '4th',
    topic: 'Privacy',
    simple:
      'Protection against unreasonable searches and seizures (need a warrant).',
    original:
      'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.',
  },
  {
    id: '5th',
    topic: 'Due Process',
    simple: 'Right to remain silent; no double jeopardy; due process required.',
    original:
      'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury... nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.',
  },
  {
    id: '6th',
    topic: 'Trial',
    simple: 'Right to a speedy, public trial and a lawyer.',
    original:
      'In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed... and to have the Assistance of Counsel for his defence.',
  },
  {
    id: '8th',
    topic: 'Punishment',
    simple: 'No cruel or unusual punishment; no excessive bail.',
    original:
      'Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.',
  },
  {
    id: '13th',
    topic: 'Slavery',
    simple: 'Abolished slavery in the United States.',
    original:
      'Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.',
  },
  {
    id: '14th',
    topic: 'Equality',
    simple:
      'Grants citizenship to anyone born in the US; guarantees equal protection under the law.',
    original:
      'All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws.',
  },
  {
    id: '19th',
    topic: 'Voting (Sex)',
    simple: "Women's right to vote.",
    original:
      'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.',
  },
];

function ConstitutionExplorer({ onExit }) {
  const [mode, setMode] = useState('simple'); // 'simple' | 'original'
  const [search, setSearch] = useState('');

  const filtered = AMENDMENTS_DB.filter(
    (item) =>
      item.simple.toLowerCase().includes(search.toLowerCase()) ||
      item.topic.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
          >
            <span>← Back</span>
          </button>
          <h1 className="text-2xl font-bold">Constitution Explorer</h1>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <input
            type="text"
            placeholder="Search (e.g. 'speech', 'voting', '14th')"
            className="w-full sm:w-72 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('simple')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                mode === 'simple'
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Plain English
            </button>
            <button
              onClick={() => setMode('original')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                mode === 'original'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Original Text
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((amendment) => (
            <div
              key={amendment.id}
              className="flex flex-col p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                  {amendment.id} Amendment
                </span>
                <span className="text-xs font-medium text-sky-600 dark:text-sky-400">
                  {amendment.topic}
                </span>
              </div>
              <p
                className={`text-base leading-relaxed flex-grow ${
                  mode === 'original'
                    ? 'font-serif italic text-slate-700 dark:text-slate-300'
                    : 'font-sans text-slate-900 dark:text-white'
                }`}
              >
                {mode === 'original'
                  ? `"${amendment.original}"`
                  : amendment.simple}
              </p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No amendments found matching "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConstitutionExplorer;
