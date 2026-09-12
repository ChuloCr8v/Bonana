import React, { useState } from "react";
import {
  Terminal,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  GitBranch,
  ArrowRight,
} from "lucide-react";

type CommandType = "status" | "pull" | "push" | "reconcile";

export const QikenvOCCSimulator: React.FC = () => {
  const [localVersion, setLocalVersion] = useState<number>(2);
  const [localHash, setLocalHash] = useState<string>("a41f8e");
  const [remoteVersion, setRemoteVersion] = useState<number>(2);
  const [remoteHash, setRemoteHash] = useState<string>("a41f8e");
  const [teammatePushed, setTeammatePushed] = useState<boolean>(false);
  const [outputLog, setOutputLog] = useState<
    Array<{ text: string; type?: "info" | "error" | "success" }>
  >([
    { text: "$ qikenv status", type: "info" },
    { text: "Target: zoracom-gateway / env: staging", type: "info" },
    { text: "Local:  v1.2.0 [a41f8e] (Clean)", type: "info" },
    { text: "Remote: v1.2.0 [a41f8e] (In Sync)", type: "success" },
    { text: "Status: 0 pending diffs. Ready for execution.", type: "info" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateTeammatePush = () => {
    setRemoteVersion(3);
    setRemoteHash("c9b312");
    setTeammatePushed(true);
    setOutputLog((prev) => [
      ...prev,
      {
        text: "--- EVENT: Teammate pushed commit [c9b312] to remote ---",
        type: "info",
      },
      {
        text: "Remote updated: v1.3.0 [c9b312] (Added REDIS_CACHE_TTL)",
        type: "info",
      },
      { text: "Local still anchored to base v1.2.0 [a41f8e].", type: "info" },
    ]);
  };

  const handleCommand = (cmd: CommandType) => {
    setIsProcessing(true);

    setTimeout(() => {
      if (cmd === "status") {
        const isConflict = localVersion !== remoteVersion;
        setOutputLog((prev) => [
          ...prev,
          { text: "$ qikenv status", type: "info" },
          {
            text: `Local State:  v1.${localVersion}.0 [${localHash}]`,
            type: "info",
          },
          {
            text: `Remote State: v1.${remoteVersion}.0 [${remoteHash}]`,
            type: isConflict ? "error" : "success",
          },
          {
            text: isConflict
              ? "WARNING: Remote has advanced. Optimistic concurrency check will fail on push."
              : "All variables verified. Local matches remote cryptographic digest.",
            type: isConflict ? "error" : "success",
          },
        ]);
      } else if (cmd === "push") {
        if (localVersion !== remoteVersion) {
          setOutputLog((prev) => [
            ...prev,
            { text: "$ qikenv push", type: "info" },
            {
              text: `[OCC_ERROR 412] Precondition Failed: Remote SHA [${remoteHash}] does not match local base SHA [${localHash}].`,
              type: "error",
            },
            {
              text: "Push rejected to prevent silent secret clobbering. Run `qikenv pull --reconcile` to merge safely.",
              type: "error",
            },
          ]);
        } else {
          const nextVer = localVersion + 1;
          const nextHash = Math.random().toString(16).substring(2, 8);
          setLocalVersion(nextVer);
          setLocalHash(nextHash);
          setRemoteVersion(nextVer);
          setRemoteHash(nextHash);
          setTeammatePushed(false);
          setOutputLog((prev) => [
            ...prev,
            { text: "$ qikenv push", type: "info" },
            {
              text: `Optimistic concurrency check passed: Remote SHA [${localHash}] == Local SHA.`,
              type: "success",
            },
            {
              text: `Encrypted payload transmitted to vault. Remote advanced to v1.${nextVer}.0 [${nextHash}].`,
              type: "success",
            },
          ]);
        }
      } else if (cmd === "pull") {
        setLocalVersion(remoteVersion);
        setLocalHash(remoteHash);
        setOutputLog((prev) => [
          ...prev,
          { text: "$ qikenv pull", type: "info" },
          {
            text: `Synchronized local workspace with remote v1.${remoteVersion}.0 [${remoteHash}].`,
            type: "success",
          },
          { text: "Local .env updated atomically.", type: "info" },
        ]);
      } else if (cmd === "reconcile") {
        const nextVer = remoteVersion + 1;
        const nextHash = "e7102a";
        setLocalVersion(nextVer);
        setLocalHash(nextHash);
        setRemoteVersion(nextVer);
        setRemoteHash(nextHash);
        setTeammatePushed(false);
        setOutputLog((prev) => [
          ...prev,
          { text: "$ qikenv pull --reconcile", type: "info" },
          {
            text: "Executing 3-way hash reconciliation without echoing secret values...",
            type: "info",
          },
          {
            text: "Auto-merged: +REDIS_CACHE_TTL (remote), +STRIPE_WEBHOOK_SECRET (local)",
            type: "info",
          },
          {
            text: `Reconciliation verified. New version sealed: v1.${nextVer}.0 [${nextHash}].`,
            type: "success",
          },
        ]);
      }

      setIsProcessing(false);
    }, 250);
  };

  const resetDemo = () => {
    setLocalVersion(2);
    setLocalHash("a41f8e");
    setRemoteVersion(2);
    setRemoteHash("a41f8e");
    setTeammatePushed(false);
    setOutputLog([
      { text: "$ qikenv status", type: "info" },
      { text: "Target: zoracom-gateway / env: staging", type: "info" },
      { text: "Local:  v1.2.0 [a41f8e] (Clean)", type: "info" },
      { text: "Remote: v1.2.0 [a41f8e] (In Sync)", type: "success" },
    ]);
  };

  const isDiverged = localVersion !== remoteVersion;

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] bg-[var(--surface-alt)] px-3 sm:px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[var(--accent)]" />
          <span className=" text-xs font-semibold text-[var(--text-main)]">
            qikenv CLI · OCC Concurrency Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px]  border ${
              isDiverged
                ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
            }`}
          >
            {isDiverged ? (
              <>
                <AlertCircle className="h-3 w-3" />
                <span>State: Diverged</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                <span>State: Synced</span>
              </>
            )}
          </span>

          <button
            onClick={resetDemo}
            className="inline-flex items-center gap-1 border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px]  text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors cursor-pointer"
            title="Reset simulation state"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* State Machine Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] bg-[var(--surface)] text-xs">
        {/* Local Node */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px]  text-[var(--text-faint)]">
            <span>LOCAL CLIENT STATE</span>
            <span className="text-[var(--text-main)] font-semibold">
              Workspace
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2 ">
            <span className="text-sm font-semibold text-[var(--text-main)]">
              v1.{localVersion}.0
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              SHA: {localHash}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            Base revision anchored when developer initialized or pulled
            repository.
          </p>
        </div>

        {/* Remote Node */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px]  text-[var(--text-faint)]">
            <span>REMOTE VAULT REVISION</span>
            <span className="text-[var(--text-main)] font-semibold">
              PostgreSQL
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2 ">
            <span className="text-sm font-semibold text-[var(--text-main)]">
              v1.{remoteVersion}.0
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              SHA: {remoteHash}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            Canonical source of truth verified prior to committing changes to
            storage.
          </p>
        </div>
      </div>

      {/* Simulator Actions Bar (Mobile-friendly touch targets min 44px on mobile) */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-alt)] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px]  text-[var(--text-faint)] mr-1 hidden sm:inline">
            RUN CLI:
          </span>

          <button
            onClick={() => handleCommand("status")}
            disabled={isProcessing}
            className="min-h-[38px] sm:min-h-0 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs  text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            qikenv status
          </button>

          <button
            onClick={() => handleCommand("push")}
            disabled={isProcessing}
            className="min-h-[38px] sm:min-h-0 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs  text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            qikenv push
          </button>

          <button
            onClick={() => handleCommand("pull")}
            disabled={isProcessing}
            className="min-h-[38px] sm:min-h-0 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs  text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            qikenv pull
          </button>

          {isDiverged && (
            <button
              onClick={() => handleCommand("reconcile")}
              disabled={isProcessing}
              className="min-h-[38px] sm:min-h-0 border border-[var(--accent)] bg-[var(--accent-subtle)] px-3 py-1.5 text-xs  text-[var(--accent)] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              qikenv pull --reconcile
            </button>
          )}

          <div className="sm:ml-auto w-full sm:w-auto mt-1 sm:mt-0">
            <button
              onClick={simulateTeammatePush}
              disabled={teammatePushed || isProcessing}
              className={`w-full sm:w-auto min-h-[38px] sm:min-h-0 inline-flex items-center justify-center gap-1.5 border px-3 py-1.5 text-xs  transition-colors ${
                teammatePushed
                  ? "border-[var(--border)] text-[var(--text-faint)] bg-[var(--surface)] cursor-not-allowed opacity-60"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 cursor-pointer"
              }`}
            >
              <GitBranch className="h-3.5 w-3.5" />
              <span>
                {teammatePushed
                  ? "Teammate Diverged"
                  : "Simulate Teammate Push"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Output Screen */}
      <div className="bg-[#09090b] text-[#f4f4f5] p-3 sm:p-4  text-xs max-h-56 overflow-y-auto space-y-1">
        {outputLog.map((log, index) => (
          <div
            key={index}
            className={`leading-relaxed ${
              log.type === "error"
                ? "text-rose-400 font-medium"
                : log.type === "success"
                  ? "text-emerald-400 font-medium"
                  : log.text.startsWith("$")
                    ? "text-zinc-100 font-semibold pt-1"
                    : log.text.startsWith("---")
                      ? "text-amber-300 italic"
                      : "text-zinc-300"
            }`}
          >
            {log.text}
          </div>
        ))}
      </div>

      {/* Educational System Note */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-alt)] px-3 sm:px-4 py-2 text-[11px] text-[var(--text-muted)]  flex flex-wrap items-center justify-between gap-2">
        <span>
          OCC Principle: Hash revisions prevent race conditions without table
          locks.
        </span>
        <a
          href="https://www.npmjs.com/package/qikenv"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] hover:underline font-medium inline-flex items-center gap-1"
        >
          <span>npmjs.com/package/qikenv</span>
        </a>
      </div>
    </div>
  );
};
