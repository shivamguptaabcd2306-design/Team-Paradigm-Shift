import { useState, useRef } from "react";

import {
  FileText,
  RefreshCw,
  AlertTriangle,
  MapPin,
  Activity,
  ShieldAlert,
  Building2,
  Route,
  Download,
  CheckCircle2,
  Printer,
  Waves,
  Users,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import DisasterMap from "./DisasterMap";
import { DAMAGE_STATISTICS } from "./disasterData";


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

  // --------------------------------------------------
  // PDF REPORT REFERENCE
  // --------------------------------------------------

  const reportRef = useRef(null);

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);


  // --------------------------------------------------
  // DOWNLOAD PDF REPORT
  // --------------------------------------------------

  const downloadReport = async () => {

    if (!reportRef.current) {
      alert("Report section is not available.");
      return;
    }

    try {

      setPdfLoading(true);

      const canvas = await html2canvas(reportRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#0b1120",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;

      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;


      // First page
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;


      // Additional pages
      while (heightLeft > 0) {

        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
      }


      // File name
      const regionName =
        disasterInfo.region || "Dhemaji";

      const safeRegionName =
        regionName
          .replace(/[^a-zA-Z0-9]/g, "_")
          .replace(/_+/g, "_");


      pdf.save(
        `EODSS_Disaster_Assessment_${safeRegionName}.pdf`
      );


      setDownloadSuccess(true);

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);

    } catch (error) {

      console.error(
        "PDF generation failed:",
        error
      );

      alert(
        "Unable to generate the PDF report. Please try again."
      );

    } finally {

      setPdfLoading(false);

    }
  };


  // --------------------------------------------------
  // EXPORT TEXT REPORT
  // --------------------------------------------------

  const handleExport = () => {

    const reportText = `
EODSS
EMERGENCY OPERATIONS DECISION SUPPORT SYSTEM

============================================================
OFFICIAL EXECUTIVE DISASTER REPORT
============================================================

DISASTER EVENT
${disasterInfo.type || "Assam Severe Flood Response"}

REGION
${disasterInfo.region || "Dhemaji District, Assam"}

STATUS
${disasterInfo.status || "ACTIVE RESPONSE"}

SEVERITY
${disasterInfo.severity || "CRITICAL"}

GENERATED
${new Date().toLocaleString()}


============================================================
1. INFRASTRUCTURE DAMAGE METRICS
============================================================

Severely Damaged Buildings:
${DAMAGE_STATISTICS?.severeBuildings ?? 0}

Highly Damaged Buildings:
${DAMAGE_STATISTICS?.highBuildings ?? 0}

Blocked Roads:
${DAMAGE_STATISTICS?.blockedRoads ?? 0}

Submerged Area:
${DAMAGE_STATISTICS?.totalSubmergedArea ?? "N/A"}

Affected Population:
${DAMAGE_STATISTICS?.affectedPopulation ?? "N/A"}


============================================================
2. AI EXECUTIVE ASSESSMENT
============================================================

${report || "No AI assessment available."}


============================================================
3. IMPACTED LOCATIONS
============================================================

${
  affectedLocations.length > 0
    ? affectedLocations
        .map(
          (location, index) =>
            `${index + 1}. ${location.name || "Unknown Location"}
   Severity: ${location.severity || "UNKNOWN"}
   Details: ${location.note || "No additional information available."}`
        )
        .join("\n\n")
    : "No impacted locations available."
}


============================================================
4. GIS ANALYSIS
============================================================

Pre-disaster region:
Baseline geographical region before the disaster.

Post-disaster region:
Detected affected/flood inundation region.

AI classified region:
AI-derived disaster severity zones.

Severity classes:
CRITICAL
HIGH
MODERATE
LOW


============================================================
5. INFRASTRUCTURE RESPONSE PRIORITIES
============================================================

Severely damaged buildings should receive immediate
field inspection and emergency response priority.

Blocked roads should be considered for emergency
routing and rescue logistics.

Critical and high-severity zones should receive
priority for evacuation, rescue and relief operations.


============================================================
END OF REPORT
============================================================

Generated by EODSS AI Disaster Assessment System
`;

    const blob = new Blob(
      [reportText],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `EODSS_Disaster_Report_${
        disasterInfo.region || "Dhemaji"
      }.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setDownloadSuccess(true);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };


  // --------------------------------------------------
  // PRINT REPORT
  // --------------------------------------------------

  const handlePrint = () => {
    window.print();
  };


  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (

    <div
      ref={reportRef}
      className="space-y-6"
    >


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="
        bg-[#0F172A]/90
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-5
        shadow-2xl
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      ">

        <div className="flex items-center gap-3">

          <div className="
            w-11
            h-11
            rounded-xl
            bg-cyan-500/10
            border
            border-cyan-500/30
            flex
            items-center
            justify-center
          ">

            <FileText
              className="w-5 h-5 text-cyan-400"
            />

          </div>


          <div>

            <h2 className="
              text-lg
              font-bold
              text-white
            ">
              Disaster Executive Situation Report
            </h2>

            <p className="
              text-xs
              text-[#8B96AC]
              mt-1
            ">
              AI-generated multi-agency incident assessment
              & GIS damage report
            </p>

          </div>

        </div>


        {/* ACTION BUTTONS */}

        <div className="
          flex
          items-center
          gap-2
          flex-wrap
        ">


          {/* REGENERATE */}

          <button
            onClick={onRefresh}
            disabled={reportLoading}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-white/10
              bg-[#090E1A]
              text-xs
              font-semibold
              text-[#E7ECF5]
              hover:border-cyan-500/40
              hover:text-white
              disabled:opacity-50
              transition-all
            "
          >

            <RefreshCw
              className={`
                w-3.5
                h-3.5
                ${reportLoading ? "animate-spin" : ""}
              `}
            />

            {reportLoading
              ? "Generating..."
              : "Regenerate Report"}

          </button>


          {/* DOWNLOAD PDF */}

          <button
            onClick={downloadReport}
            disabled={pdfLoading}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-cyan-500
              hover:bg-cyan-400
              disabled:bg-cyan-800
              text-black
              text-xs
              font-bold
              transition-all
              shadow-lg
            "
          >

            {pdfLoading ? (

              <RefreshCw
                className="
                  w-4
                  h-4
                  animate-spin
                "
              />

            ) : (

              <Download
                className="w-4 h-4"
              />

            )}

            {pdfLoading
              ? "Creating PDF..."
              : "Download PDF"}

          </button>


          {/* TEXT EXPORT */}

          <button
            onClick={handleExport}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-600
              text-white
              text-xs
              font-bold
              hover:from-emerald-600
              hover:to-teal-700
              transition-all
            "
          >

            <FileText
              className="w-4 h-4"
            />

            Export TXT

          </button>


          {/* PRINT */}

          <button
            onClick={handlePrint}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-white/10
              bg-[#090E1A]
              text-[#D5DBE8]
              text-xs
              font-semibold
              hover:border-cyan-500/40
              transition-all
            "
          >

            <Printer
              className="w-4 h-4"
            />

            Print

          </button>

        </div>

      </div>


      {/* =====================================================
          DOWNLOAD SUCCESS
      ===================================================== */}

      {downloadSuccess && (

        <div className="
          p-4
          rounded-xl
          bg-emerald-500/15
          border
          border-emerald-500/40
          text-emerald-300
          text-xs
          font-semibold
          flex
          items-center
          gap-2
        ">

          <CheckCircle2
            className="
              w-4
              h-4
              text-emerald-400
            "
          />

          Disaster report generated successfully.

        </div>

      )}


      {/* =====================================================
          DISASTER OVERVIEW
      ===================================================== */}

      <div className="
        bg-[#0F172A]/80
        backdrop-blur-md
        border
        border-white/10
        border-l-4
        border-l-rose-500
        rounded-2xl
        p-5
        shadow-xl
      ">

        <div className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        ">


          <div>

            <div className="
              text-[11px]
              text-cyan-400
              font-mono
              uppercase
              font-bold
              tracking-wider
            ">
              ACTIVE INCIDENT DECLARATION
            </div>


            <h1 className="
              text-xl
              font-bold
              text-white
              mt-1
            ">
              {disasterInfo.type ||
                "Assam Severe Flood Response"}
            </h1>


            <div className="
              flex
              items-center
              gap-2
              mt-1.5
              text-xs
              text-[#8B96AC]
            ">

              <MapPin
                className="
                  w-3.5
                  h-3.5
                  text-cyan-400
                "
              />

              <span>
                {disasterInfo.region ||
                  "Dhemaji District, Assam"}
              </span>

              <span>•</span>

              <span className="font-mono">
                Status:{" "}
                {disasterInfo.status ||
                  "ACTIVE RESPONSE"}
              </span>

            </div>

          </div>


          <div className="
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            bg-rose-500/15
            border
            border-rose-500/30
            text-rose-400
            font-mono
            text-xs
            font-bold
          ">

            <AlertTriangle
              className="w-4 h-4"
            />

            SEVERITY:

            {disasterInfo.severity ||
              "CRITICAL"}

          </div>

        </div>

      </div>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-3.5
      ">

        <ReportStat
          icon={ShieldAlert}
          label="Incident Severity"
          value={
            disasterInfo.severity ||
            "CRITICAL"
          }
          color="rose"
        />


        <ReportStat
          icon={Activity}
          label="Affected Locations"
          value={
            affectedLocations.length
          }
          color="cyan"
        />


        <ReportStat
          icon={Building2}
          label="Severe Damaged Buildings"
          value={
            DAMAGE_STATISTICS?.severeBuildings ??
            0
          }
          color="rose"
        />


        <ReportStat
          icon={Route}
          label="Blocked Roads"
          value={
            DAMAGE_STATISTICS?.blockedRoads ??
            0
          }
          color="amber"
        />

      </div>


      {/* =====================================================
          ADDITIONAL DAMAGE METRICS
      ===================================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-3
      ">


        <div className="
          bg-[#0F172A]/70
          border
          border-white/10
          rounded-xl
          p-4
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <Building2
              className="
                w-4
                h-4
                text-orange-400
              "
            />

            <span className="
              text-xs
              text-[#8B96AC]
            ">
              HIGH DAMAGE BUILDINGS
            </span>

          </div>


          <p className="
            text-2xl
            font-bold
            text-orange-400
            mt-2
            font-mono
          ">
            {DAMAGE_STATISTICS?.highBuildings ?? 0}
          </p>

        </div>


        <div className="
          bg-[#0F172A]/70
          border
          border-white/10
          rounded-xl
          p-4
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <Waves
              className="
                w-4
                h-4
                text-cyan-400
              "
            />

            <span className="
              text-xs
              text-[#8B96AC]
            ">
              SUBMERGED AREA
            </span>

          </div>


          <p className="
            text-2xl
            font-bold
            text-cyan-400
            mt-2
            font-mono
          ">
            {DAMAGE_STATISTICS?.totalSubmergedArea ??
              "N/A"}
          </p>

        </div>


        <div className="
          bg-[#0F172A]/70
          border
          border-white/10
          rounded-xl
          p-4
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <Users
              className="
                w-4
                h-4
                text-yellow-400
              "
            />

            <span className="
              text-xs
              text-[#8B96AC]
            ">
              AFFECTED POPULATION
            </span>

          </div>


          <p className="
            text-2xl
            font-bold
            text-yellow-400
            mt-2
            font-mono
          ">
            {DAMAGE_STATISTICS?.affectedPopulation ??
              "N/A"}
          </p>

        </div>

      </div>


      {/* =====================================================
          AI EXECUTIVE ASSESSMENT
      ===================================================== */}

      <div className="
        bg-[#0F172A]/80
        backdrop-blur-md
        border
        border-white/10
        rounded-2xl
        overflow-hidden
        shadow-xl
      ">


        <div className="
          flex
          items-center
          gap-2
          px-5
          py-4
          border-b
          border-white/10
          bg-[#090E1A]
        ">

          <FileText
            className="
              w-4
              h-4
              text-violet-400
            "
          />

          <h3 className="
            text-xs
            font-bold
            text-white
            uppercase
            tracking-wider
          ">
            AI Multi-Agency Assessment & Response Plan
          </h3>

        </div>


        <div className="
          p-6
          bg-[#090E1A]/80
        ">

          {reportLoading ? (

            <div className="
              text-xs
              text-[#7C8AA3]
              font-mono
              flex
              items-center
              gap-2
            ">

              <RefreshCw
                className="
                  w-4
                  h-4
                  animate-spin
                  text-cyan-400
                "
              />

              Analyzing satellite data
              & telemetry parameters...

            </div>

          ) : reportError ? (

            <div className="
              text-xs
              text-rose-400
              font-mono
            ">
              Unable to generate disaster report.
              Please retry.
            </div>

          ) : (

            <div className="
              whitespace-pre-wrap
              text-xs
              leading-relaxed
              text-[#D5DBE8]
            ">

              {report ||
                "No executive report generated yet."}

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          GIS MAP SECTION
      ===================================================== */}

      <div className="
        bg-[#0F172A]/80
        backdrop-blur-md
        border
        border-cyan-500/20
        rounded-2xl
        p-5
        shadow-2xl
        space-y-5
      ">


        <div>

          <div className="
            flex
            items-center
            gap-2
          ">

            <MapPin
              className="
                w-5
                h-5
                text-cyan-400
              "
            />

            <h2 className="
              text-base
              font-bold
              text-white
            ">
              Satellite Change Detection
              & GIS Layer Inspection
            </h2>

          </div>


          <p className="
            text-xs
            text-[#8B96AC]
            mt-1
            font-mono
          ">
            Before / After comparison and
            AI infrastructure damage polygons
          </p>

        </div>


        {/* PRE DISASTER */}

        <div>

          <DisasterMap
            title="PRE-DISASTER BASELINE REGION"
            type="pre"
          />

        </div>


        {/* POST DISASTER */}

        <div>

          <DisasterMap
            title="POST-DISASTER FLOOD INUNDATION"
            type="post"
          />

        </div>


        {/* AI CLASSIFIED */}

        <div>

          <DisasterMap
            title="AI CLASSIFIED DAMAGE MAP"
            type="ai"
          />

        </div>

      </div>


      {/* =====================================================
          DAMAGE DETECTION SUMMARY
      ===================================================== */}

      <div className="
        bg-[#0F172A]/80
        border
        border-white/10
        rounded-2xl
        overflow-hidden
        shadow-xl
      ">

        <div className="
          px-5
          py-4
          border-b
          border-white/10
          bg-[#090E1A]
        ">

          <div className="
            flex
            items-center
            gap-2
          ">

            <ShieldAlert
              className="
                w-4
                h-4
                text-red-400
              "
            />

            <h3 className="
              text-xs
              font-bold
              text-white
              uppercase
              tracking-wider
            ">
              AI Infrastructure Damage Detection
            </h3>

          </div>

        </div>


        <div className="
          p-5
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        ">


          {/* BUILDINGS */}

          <div className="
            bg-[#090E1A]
            border
            border-red-500/20
            rounded-xl
            p-5
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-10
                  h-10
                  rounded-lg
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                ">

                  <Building2
                    className="
                      w-5
                      h-5
                      text-red-400
                    "
                  />

                </div>


                <div>

                  <h4 className="
                    text-sm
                    font-bold
                    text-white
                  ">
                    Building Damage
                  </h4>

                  <p className="
                    text-[10px]
                    text-[#7C8AA3]
                    font-mono
                    mt-1
                  ">
                    AI STRUCTURAL CLASSIFICATION
                  </p>

                </div>

              </div>


              <span className="
                text-2xl
                font-bold
                font-mono
                text-red-400
              ">
                {DAMAGE_STATISTICS?.severeBuildings ??
                  0}
              </span>

            </div>


            <div className="
              mt-4
              grid
              grid-cols-3
              gap-2
            ">

              <DamageBadge
                label="CRITICAL"
                value={
                  DAMAGE_STATISTICS?.severeBuildings ??
                  0
                }
                color="red"
              />

              <DamageBadge
                label="HIGH"
                value={
                  DAMAGE_STATISTICS?.highBuildings ??
                  0
                }
                color="orange"
              />

              <DamageBadge
                label="MODERATE"
                value="—"
                color="yellow"
              />

            </div>


            <p className="
              text-[11px]
              text-[#8B96AC]
              mt-4
              leading-relaxed
            ">
              Buildings identified as severely damaged
              should receive immediate field inspection
              and rescue priority.
            </p>

          </div>


          {/* ROADS */}

          <div className="
            bg-[#090E1A]
            border
            border-orange-500/20
            rounded-xl
            p-5
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-10
                  h-10
                  rounded-lg
                  bg-orange-500/10
                  border
                  border-orange-500/20
                  flex
                  items-center
                  justify-center
                ">

                  <Route
                    className="
                      w-5
                      h-5
                      text-orange-400
                    "
                  />

                </div>


                <div>

                  <h4 className="
                    text-sm
                    font-bold
                    text-white
                  ">
                    Road Accessibility
                  </h4>

                  <p className="
                    text-[10px]
                    text-[#7C8AA3]
                    font-mono
                    mt-1
                  ">
                    AI ROAD OBSTRUCTION DETECTION
                  </p>

                </div>

              </div>


              <span className="
                text-2xl
                font-bold
                font-mono
                text-orange-400
              ">
                {DAMAGE_STATISTICS?.blockedRoads ??
                  0}
              </span>

            </div>


            <div className="
              mt-4
              grid
              grid-cols-3
              gap-2
            ">

              <DamageBadge
                label="BLOCKED"
                value={
                  DAMAGE_STATISTICS?.blockedRoads ??
                  0
                }
                color="red"
              />

              <DamageBadge
                label="PARTIAL"
                value="—"
                color="orange"
              />

              <DamageBadge
                label="OPEN"
                value="—"
                color="green"
              />

            </div>


            <p className="
              text-[11px]
              text-[#8B96AC]
              mt-4
              leading-relaxed
            ">
              Blocked road segments should be excluded
              from emergency routing and prioritized
              for clearance operations.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          IMPACTED LOCATIONS
      ===================================================== */}

      <div className="
        bg-[#0F172A]/80
        backdrop-blur-md
        border
        border-white/10
        rounded-2xl
        overflow-hidden
        shadow-xl
      ">


        <div className="
          px-5
          py-4
          border-b
          border-white/10
          bg-[#090E1A]
        ">

          <h3 className="
            text-xs
            font-bold
            text-white
            uppercase
            tracking-wider
          ">
            Impacted Telemetry Stations & Locations
          </h3>

        </div>


        <div className="
          p-4
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
        ">

          {affectedLocations.length === 0 ? (

            <div className="
              col-span-full
              text-xs
              text-[#7C8AA3]
              text-center
              py-6
            ">
              No impacted locations detected.
            </div>

          ) : (

            affectedLocations.map(
              (location, index) => (

                <div
                  key={index}
                  className="
                    bg-[#090E1A]/90
                    border
                    border-white/5
                    rounded-xl
                    p-3.5
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >

                  <div>

                    <div className="
                      flex
                      items-center
                      gap-2
                    ">

                      <MapPin
                        className="
                          w-3.5
                          h-3.5
                          text-cyan-400
                        "
                      />

                      <span className="
                        text-xs
                        font-semibold
                        text-white
                      ">
                        {location.name}
                      </span>

                    </div>


                    <p className="
                      text-[11px]
                      text-[#8B96AC]
                      mt-1.5
                    ">
                      {location.note}
                    </p>

                  </div>


                  <span className="
                    text-[10px]
                    font-mono
                    px-2
                    py-0.5
                    rounded
                    bg-rose-500/20
                    text-rose-400
                    font-bold
                    whitespace-nowrap
                  ">
                    {location.severity}
                  </span>

                </div>

              )
            )

          )}

        </div>

      </div>


      {/* =====================================================
          REPORT FOOTER
      ===================================================== */}

      <div className="
        text-center
        py-5
        border-t
        border-white/5
      ">

        <p className="
          text-[10px]
          text-[#596579]
          font-mono
        ">
          EODSS • Emergency Operations Decision
          Support System
        </p>

        <p className="
          text-[9px]
          text-[#414B5C]
          font-mono
          mt-1
        ">
          AI-assisted disaster assessment •
          GIS infrastructure analysis
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   REPORT STAT COMPONENT
============================================================ */

function ReportStat({
  icon: Icon,
  label,
  value,
  color,
}) {

  const colorClass =
    color === "rose"
      ? "text-rose-400"
      : color === "amber"
      ? "text-amber-400"
      : "text-cyan-400";


  return (

    <div className="
      bg-[#0F172A]/70
      backdrop-blur-md
      border
      border-white/10
      rounded-2xl
      p-4
      shadow-xl
    ">

      <div className="
        flex
        items-center
        gap-2
        mb-2
      ">

        <Icon
          className={`
            w-4
            h-4
            ${colorClass}
          `}
        />

        <span className="
          text-[11px]
          font-mono
          text-[#8B96AC]
          uppercase
        ">
          {label}
        </span>

      </div>


      <div className={`
        text-xl
        font-bold
        font-mono
        ${colorClass}
      `}>
        {value}
      </div>

    </div>

  );
}


/* ============================================================
   DAMAGE BADGE
============================================================ */

function DamageBadge({
  label,
  value,
  color,
}) {

  const styles = {

    red: `
      bg-red-500/10
      border-red-500/20
      text-red-400
    `,

    orange: `
      bg-orange-500/10
      border-orange-500/20
      text-orange-400
    `,

    yellow: `
      bg-yellow-500/10
      border-yellow-500/20
      text-yellow-400
    `,

    green: `
      bg-green-500/10
      border-green-500/20
      text-green-400
    `,

  };


  return (

    <div className={`
      rounded-lg
      border
      p-2
      text-center
      ${styles[color]}
    `}>

      <div className="
        text-[9px]
        font-mono
        font-bold
      ">
        {label}
      </div>

      <div className="
        text-sm
        font-bold
        font-mono
        mt-1
      ">
        {value}
      </div>

    </div>

  );
}