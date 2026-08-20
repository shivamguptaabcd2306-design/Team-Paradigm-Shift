import {
  FileText,
  RefreshCw,
  AlertTriangle,
  MapPin,
  Users,
  Package,
  Activity,
  ShieldAlert,
} from "lucide-react";

export default function DisasterReport({
  disasterInfo = {},
  affectedLocations = [],
  statCards = [],
  resources = [],
  report,
  reportLoading,
  reportError,
  onRefresh,
}) {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold">
              Disaster Report
            </h2>
          </div>

          <p className="text-[12px] text-[#7C8AA3] font-mono mt-1">
            AI-generated operational disaster assessment
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={reportLoading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg
          border border-[#1B2434] bg-[#111826]
          text-[12px] text-[#B7C0D1]
          hover:text-white hover:border-cyan-500/40
          disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${
              reportLoading ? "animate-spin" : ""
            }`}
          />

          {reportLoading ? "Generating..." : "Regenerate Report"}
        </button>
      </div>

      {/* Disaster overview */}
      <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-5">

        <div className="flex flex-wrap justify-between gap-4">

          <div>
            <div className="text-[11px] text-cyan-400 font-mono uppercase">
              Active Disaster
            </div>

            <h1 className="text-xl font-semibold mt-1">
              {disasterInfo.type || "Disaster Event"}
            </h1>

            <div className="flex items-center gap-1.5 mt-2 text-[12px] text-[#7C8AA3]">
              <MapPin className="w-3.5 h-3.5" />
              {disasterInfo.region || "Unknown region"}
            </div>
          </div>

          <div className="flex items-center gap-2">

            <AlertTriangle className="w-4 h-4 text-rose-400" />

            <span className="text-[12px] font-semibold text-rose-400">
              {disasterInfo.severity || "Unknown"}
            </span>

          </div>

        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <ReportStat
          icon={ShieldAlert}
          label="Severity"
          value={disasterInfo.severity || "—"}
        />

        <ReportStat
          icon={Activity}
          label="Affected Locations"
          value={affectedLocations.length}
        />

        <ReportStat
          icon={AlertTriangle}
          label="Danger Stations"
          value={
            statCards.find(
              (s) => s.label === "Stations Above Danger"
            )?.value || "—"
          }
        />

        <ReportStat
          icon={Users}
          label="Field Teams"
          value={
            statCards.find(
              (s) => s.label === "Field Survey Teams"
            )?.value || "—"
          }
        />

      </div>

      {/* AI report */}
      <div className="bg-[#111826] border border-[#1B2434] rounded-xl overflow-hidden">

        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1B2434]">
          <FileText className="w-4 h-4 text-violet-400" />

          <h3 className="text-[13px] font-semibold">
            AI Executive Assessment
          </h3>
        </div>

        <div className="p-5">

          {reportLoading && (
            <div className="text-[13px] text-[#7C8AA3] font-mono">
              Analyzing telemetry, affected locations and resource
              availability...
            </div>
          )}

          {reportError && !reportLoading && (
            <div className="text-[13px] text-rose-400">
              Unable to generate the disaster report.
              Please try again.
            </div>
          )}

          {!reportLoading && !reportError && (
            <div className="whitespace-pre-wrap text-[13px] leading-7 text-[#B7C0D1]">
              {report || "No report generated yet."}
            </div>
          )}

        </div>
      </div>

      {/* Affected locations */}
      <div className="bg-[#111826] border border-[#1B2434] rounded-xl">

        <div className="px-5 py-4 border-b border-[#1B2434]">
          <h3 className="text-[13px] font-semibold">
            Impacted Locations
          </h3>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">

          {affectedLocations.map((location, index) => (

            <div
              key={index}
              className="bg-[#0D1420] border border-[#1B2434] rounded-lg p-4"
            >

              <div className="flex justify-between gap-3">

                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />

                    <span className="text-[12px] font-medium">
                      {location.name}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7C8AA3] mt-2">
                    {location.note}
                  </p>
                </div>

                <span className="text-[10px] text-rose-400 font-mono">
                  {location.severity}
                </span>

              </div>

            </div>

          ))}

        </div>
      </div>

      {/* Resources */}
      <div className="bg-[#111826] border border-[#1B2434] rounded-xl">

        <div className="px-5 py-4 border-b border-[#1B2434]">
          <h3 className="text-[13px] font-semibold">
            Resource Readiness
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">

          {resources.map((resource, index) => (

            <div
              key={index}
              className="bg-[#0D1420] border border-[#1B2434] rounded-lg p-4"
            >

              <div className="flex justify-between">

                <span className="text-[12px] text-[#B7C0D1]">
                  {resource.name}
                </span>

                <span className="text-[12px] text-cyan-400 font-mono">
                  {resource.available}/{resource.total}
                </span>

              </div>

              <div className="mt-2 h-1.5 bg-[#1B2434] rounded-full overflow-hidden">

                <div
                  className="h-full bg-cyan-400"
                  style={{
                    width: `${Math.min(
                      100,
                      (resource.available / resource.total) * 100
                    )}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>
      </div>

    </div>
  );
}

function ReportStat({ icon: Icon, label, value }) {

  return (
    <div className="bg-[#111826] border border-[#1B2434] rounded-xl p-4">

      <div className="flex items-center gap-2 text-[#7C8AA3]">
        <Icon className="w-4 h-4 text-cyan-400" />

        <span className="text-[10px] font-mono">
          {label}
        </span>
      </div>

      <div className="text-lg font-semibold mt-2">
        {value}
      </div>

    </div>
  );
}