import React, { createContext, useContext, useState } from 'react';

type CafeSummary = { id: string; name: string; branch: string; };
type TableSummary = { id: string; number: string; };
type VisitSessionSummary = { id: string; remainingMinutes: number; };

type ActiveCafeContextType = {
  cafe: CafeSummary | null;
  table: TableSummary | null;
  visit: VisitSessionSummary | null;
  setVisitContext: (cafe: CafeSummary | null, table: TableSummary | null, visit: VisitSessionSummary | null) => void;
};

const ActiveCafeContext = createContext<ActiveCafeContextType>({
  cafe: null,
  table: null,
  visit: null,
  setVisitContext: () => {},
});

export const useActiveCafe = () => useContext(ActiveCafeContext);

export const ActiveCafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cafe, setCafe] = useState<CafeSummary | null>({ id: 'c1', name: 'کافه نادری', branch: 'شعبه جمهوری' });
  const [table, setTable] = useState<TableSummary | null>({ id: 't12', number: '۱۲' });
  const [visit, setVisit] = useState<VisitSessionSummary | null>({ id: 'v1', remainingMinutes: 98 });

  return (
    <ActiveCafeContext.Provider value={{ cafe, table, visit, setVisitContext: (c, t, v) => { setCafe(c); setTable(t); setVisit(v); } }}>
      {children}
    </ActiveCafeContext.Provider>
  );
};
