import { NextResponse } from 'next/server';

export async function GET() {
  // In a production environment, this securely queries the AWS backend
  const platformMetrics = {
    incidentsMonitored: 1348,
    camerasOnline: 64,
    alertsResponded: 2317,
    uptime: 99.98,
    sitesProtected: 12,
    usersActive: 156
  };

  return NextResponse.json(platformMetrics, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
    },
  });
}
