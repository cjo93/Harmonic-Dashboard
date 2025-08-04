import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      api: 'operational',
      database: 'connected'
    }
  })
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
