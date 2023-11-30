function Discussion({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="bg-white w-[40vw] h-full">
        <h3>asdfhasjdf</h3>
      </div>
      <div className="w-full bg-green-500">{children}</div>
    </div>
  );
}

export default Discussion;
