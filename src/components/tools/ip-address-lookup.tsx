"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RouterIcon from "@mui/icons-material/Router";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";

interface IPInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
}

export default function IpAddressLookup({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error("Failed to fetch IP information");
        }
        const data = await response.json();
        setIpInfo({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          loc:
            data.latitude && data.longitude
              ? `${data.latitude}, ${data.longitude}`
              : undefined,
          org: data.org,
          timezone: data.timezone,
        });
        setError("");
      } catch (err) {
        setError("Unable to fetch IP information. Please try again later.");
        console.error("IP fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIPInfo();
  }, []);

  const copyIP = () => {
    if (ipInfo?.ip) {
      toolState.actions.copyText(ipInfo.ip, "IP address copied!");
    }
  };

  const buttons = [
    {
      type: "custom" as const,
      text: "Copy IP Address",
      onClick: copyIP,
      icon: <ContentCopyIcon />,
      variant: "contained" as const,
      color: "primary" as const,
      disabled: !ipInfo?.ip,
    },
  ];

  return (
    <ToolLayout
      isFullScreen={toolState.isFullScreen}
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="IP Address Lookup Tool"
        description="Instantly find your public IP address and network information. View your IP, location, ISP, and connection details."
      />

      <div className="flex flex-col gap-4 w-full">
        <ToolControls buttons={buttons} isFullScreen={toolState.isFullScreen} />

        {loading && (
          <div className="flex justify-center items-center p-8">
            <CircularProgress />
          </div>
        )}

        {error && (
          <Card className="border border-red-300 bg-red-50">
            <CardContent>
              <Typography color="error">{error}</Typography>
            </CardContent>
          </Card>
        )}

        {!loading && !error && ipInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <PublicIcon color="primary" />
                  <Typography variant="h6" className="text-lg font-semibold">
                    IP Address
                  </Typography>
                </div>
                <TextField
                  value={ipInfo.ip}
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                      style: {
                        fontFamily: "monospace",
                        fontSize: "18px",
                        fontWeight: "bold",
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>

            {ipInfo.city && (
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <LocationOnIcon color="primary" />
                    <Typography variant="h6" className="text-lg font-semibold">
                      Location
                    </Typography>
                  </div>
                  <TextField
                    value={`${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {ipInfo.org && (
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <RouterIcon color="primary" />
                    <Typography variant="h6" className="text-lg font-semibold">
                      ISP / Organization
                    </Typography>
                  </div>
                  <TextField
                    value={ipInfo.org}
                    fullWidth
                    multiline
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {ipInfo.timezone && (
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <PublicIcon color="primary" />
                    <Typography variant="h6" className="text-lg font-semibold">
                      Timezone
                    </Typography>
                  </div>
                  <TextField
                    value={ipInfo.timezone}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {ipInfo.loc && (
              <Card className="border border-gray-200 md:col-span-2">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <LocationOnIcon color="primary" />
                    <Typography variant="h6" className="text-lg font-semibold">
                      Coordinates
                    </Typography>
                  </div>
                  <TextField
                    value={ipInfo.loc}
                    fullWidth
                    slotProps={{
                      input: {
                        readOnly: true,
                        style: {
                          fontFamily: "monospace",
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card className="border border-blue-200 bg-blue-50 mt-4">
          <CardContent>
            <Typography variant="body2" className="text-gray-700">
              <strong>Note:</strong> This tool displays your public IP address
              as seen by external servers. The location information is
              approximate and based on your ISP&apos;s registration data. For
              enhanced privacy, consider using a VPN service.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
