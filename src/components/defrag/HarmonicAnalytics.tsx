'use client'

import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { HarmonicProfile } from '@/types'

'use client'

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import * as d3 from 'd3'
import { TrendingUp, TrendingDown, Minus, Activity, BarChart3, PieChart, LineChart } from 'lucide-react'
import { HarmonicProfile } from '@/types'

const AnalyticsContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(16, 185, 129, 0.1));
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`

const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Title = styled.h3`
  color: #10b981;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ViewControls = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ViewButton = styled(motion.button)<{ $active?: boolean }>`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #10b981, #059669)' 
    : 'rgba(16, 185, 129, 0.2)'
  };
  border: 1px solid #10b981;
  color: ${props => props.$active ? '#fff' : '#10b981'};
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #059669, #047857)' 
      : 'rgba(16, 185, 129, 0.3)'
    };
  }
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const MetricCard = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
`

const MetricLabel = styled.div`
  color: rgba(16, 185, 129, 0.8);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const MetricValue = styled.div`
  color: #10b981;
  font-family: 'Noto Serif', serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const MetricTrend = styled.div<{ $trend: 'up' | 'down' | 'stable' }>`
  color: ${props => {
    switch (props.$trend) {
      case 'up': return '#10b981'
      case 'down': return '#ef4444'
      default: return '#6b7280'
    }
  }};
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 1rem;
  overflow: hidden;
`

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;
`

type ViewType = 'overview' | 'trends' | 'harmonics' | 'resonance'

interface HarmonicAnalyticsProps {
  harmonicProfile: HarmonicProfile
  className?: string
}

const MOCK_HISTORICAL_DATA = [
  { time: Date.now() - 300000, msi: 72, resonance: 68, coherence: 75 },
  { time: Date.now() - 240000, msi: 74, resonance: 71, coherence: 76 },
  { time: Date.now() - 180000, msi: 76, resonance: 73, coherence: 78 },
  { time: Date.now() - 120000, msi: 78, resonance: 75, coherence: 80 },
  { time: Date.now() - 60000, msi: 80, resonance: 77, coherence: 82 },
  { time: Date.now(), msi: 82, resonance: 79, coherence: 84 }
]

export default function HarmonicAnalytics({ harmonicProfile, className }: HarmonicAnalyticsProps) {
  const [activeView, setActiveView] = useState<ViewType>('overview')
  const svgRef = useRef<SVGSVGElement>(null)
  const [historicalData, setHistoricalData] = useState(MOCK_HISTORICAL_DATA)

  const calculateMetrics = () => {
    const resonanceLevel = harmonicProfile.gearAlignments.reduce((acc, gear) => acc + gear.resonanceLevel, 0) / harmonicProfile.gearAlignments.length
    const coherenceLevel = harmonicProfile.msi * 0.8 + resonanceLevel * 0.2
    const harmonicBalance = Math.abs(50 - Math.abs(harmonicProfile.mirrorState.clarity - harmonicProfile.mirrorState.resonance))
    
    return {
      msi: { value: harmonicProfile.msi, trend: 'up' as const, change: 5.2 },
      resonance: { value: resonanceLevel, trend: 'up' as const, change: 2.8 },
      coherence: { value: coherenceLevel, trend: 'stable' as const, change: 0.1 },
      balance: { value: harmonicBalance, trend: 'down' as const, change: -1.5 }
    }
  }

  const metrics = calculateMetrics()

  const renderTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} />
      case 'down': return <TrendingDown size={14} />
      default: return <Minus size={14} />
    }
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = 700 - margin.left - margin.right
    const height = 250 - margin.top - margin.bottom

    const container = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    if (activeView === 'trends') {
      // Line chart for trends
      const xScale = d3.scaleTime()
        .domain(d3.extent(historicalData, d => new Date(d.time)) as [Date, Date])
        .range([0, width])

      const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])

      const line = d3.line<typeof historicalData[0]>()
        .x(d => xScale(new Date(d.time)))
        .y(d => yScale(d.msi))
        .curve(d3.curveCardinal)

      // Add axes
      container.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M")))
        .selectAll("text")
        .style("fill", "#10b981")

      container.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("fill", "#10b981")

      // Add line
      container.append("path")
        .datum(historicalData)
        .attr("fill", "none")
        .attr("stroke", "#10b981")
        .attr("stroke-width", 3)
        .attr("d", line)

      // Add dots
      container.selectAll(".dot")
        .data(historicalData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(new Date(d.time)))
        .attr("cy", d => yScale(d.msi))
        .attr("r", 4)
        .attr("fill", "#10b981")
        .style("opacity", 0.8)

    } else if (activeView === 'harmonics') {
      // Bar chart for harmonic bands
      const data = harmonicProfile.symbolicBands.map((band, i) => ({
        frequency: band.frequency,
        amplitude: band.amplitude * 100,
        color: band.color
      }))

      const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, width])
        .padding(0.1)

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.amplitude) || 100])
        .range([height, 0])

      // Add bars
      container.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (_, i) => xScale(i.toString()) || 0)
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.amplitude))
        .attr("height", d => height - yScale(d.amplitude))
        .attr("fill", d => d.color)
        .style("opacity", 0.8)

      // Add axes
      container.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("fill", "#10b981")

      container.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("fill", "#10b981")
    }

    // Add new data point every 10 seconds for demo
    const interval = setInterval(() => {
      const newDataPoint = {
        time: Date.now(),
        msi: harmonicProfile.msi + Math.random() * 10 - 5,
        resonance: metrics.resonance.value + Math.random() * 8 - 4,
        coherence: metrics.coherence.value + Math.random() * 6 - 3
      }
      
      setHistoricalData(prev => [...prev.slice(-9), newDataPoint])
    }, 10000)

    return () => clearInterval(interval)
  }, [activeView, historicalData, harmonicProfile, metrics])

  return (
    <AnalyticsContainer
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnalyticsHeader>
        <Title>
          <Activity size={20} />
          Harmonic Analytics
        </Title>
        
        <ViewControls>
          <ViewButton
            $active={activeView === 'overview'}
            onClick={() => setActiveView('overview')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 size={16} />
          </ViewButton>
          
          <ViewButton
            $active={activeView === 'trends'}
            onClick={() => setActiveView('trends')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LineChart size={16} />
          </ViewButton>
          
          <ViewButton
            $active={activeView === 'harmonics'}
            onClick={() => setActiveView('harmonics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PieChart size={16} />
          </ViewButton>
        </ViewControls>
      </AnalyticsHeader>

      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MetricsGrid>
              <MetricCard>
                <MetricLabel>Mirror State Index</MetricLabel>
                <MetricValue>
                  {metrics.msi.value.toFixed(1)}
                  {renderTrendIcon(metrics.msi.trend)}
                </MetricValue>
                <MetricTrend $trend={metrics.msi.trend}>
                  {metrics.msi.change > 0 ? '+' : ''}{metrics.msi.change.toFixed(1)}%
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Resonance Level</MetricLabel>
                <MetricValue>
                  {metrics.resonance.value.toFixed(1)}
                  {renderTrendIcon(metrics.resonance.trend)}
                </MetricValue>
                <MetricTrend $trend={metrics.resonance.trend}>
                  {metrics.resonance.change > 0 ? '+' : ''}{metrics.resonance.change.toFixed(1)}%
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Coherence</MetricLabel>
                <MetricValue>
                  {metrics.coherence.value.toFixed(1)}
                  {renderTrendIcon(metrics.coherence.trend)}
                </MetricValue>
                <MetricTrend $trend={metrics.coherence.trend}>
                  {metrics.coherence.change > 0 ? '+' : ''}{metrics.coherence.change.toFixed(1)}%
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricLabel>Harmonic Balance</MetricLabel>
                <MetricValue>
                  {metrics.balance.value.toFixed(1)}
                  {renderTrendIcon(metrics.balance.trend)}
                </MetricValue>
                <MetricTrend $trend={metrics.balance.trend}>
                  {metrics.balance.change > 0 ? '+' : ''}{metrics.balance.change.toFixed(1)}%
                </MetricTrend>
              </MetricCard>
            </MetricsGrid>
          </motion.div>
        )}

        {(activeView === 'trends' || activeView === 'harmonics') && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChartContainer>
              <ChartSvg ref={svgRef} />
            </ChartContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </AnalyticsContainer>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #d4af37;
  margin: 0;
`

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.25rem;
`

const Tab = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #d4af37, #f4d03f)' 
    : 'transparent'
  };
  color: ${props => props.active ? '#000' : '#d4af37'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const MetricCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: #d4af37;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 0.5rem;
`

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #b8b8c4;
  font-family: 'Noto Serif', serif;
`

const MetricChange = styled.div<{ positive: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  margin-top: 0.5rem;
  font-weight: 500;
`

const ChartContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const ChartTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #d4af37;
  margin: 0 0 1rem 0;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  height: 8px;
  margin: 0.5rem 0;
  overflow: hidden;
`

const ProgressFill = styled(motion.div)<{ value: number; color: string }>`
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
  width: ${props => props.value}%;
`

const InsightCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2));
  border: 1px solid rgba(147, 51, 234, 0.4);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`

const InsightTitle = styled.h4`
  color: #a855f7;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`

const InsightText = styled.p`
  color: #d1d5db;
  font-family: 'Noto Serif', serif;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`

interface HarmonicAnalyticsProps {
  harmonicProfile: HarmonicProfile
  historicalData?: HarmonicProfile[]
}

type AnalyticsTab = 'overview' | 'trends' | 'insights' | 'predictions'

export default function HarmonicAnalytics({ 
  harmonicProfile, 
  historicalData = [] 
}: HarmonicAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview')

  const analytics = useMemo(() => {
    // Calculate advanced analytics from harmonic profile
    const msiTrend = historicalData.length > 1 
      ? ((harmonicProfile.msi - historicalData[historicalData.length - 2].msi) / historicalData[historicalData.length - 2].msi) * 100
      : 0

    const coherenceScore = harmonicProfile.mirrorStates.reduce((acc, mirror) => 
      acc + mirror.intensity, 0) / harmonicProfile.mirrorStates.length

    const alignmentScore = harmonicProfile.gearAlignments.reduce((acc, gear) => 
      acc + gear.resonanceLevel, 0) / harmonicProfile.gearAlignments.length

    const evolutionRate = historicalData.length > 0 
      ? Math.abs(harmonicProfile.msi - (historicalData[0]?.msi || 0)) / historicalData.length
      : 0

    return {
      msiTrend,
      coherenceScore,
      alignmentScore,
      evolutionRate,
      stabilityIndex: 100 - (Math.abs(msiTrend) * 2),
      integrationLevel: (coherenceScore + alignmentScore) / 2
    }
  }, [harmonicProfile, historicalData])

  const insights = useMemo(() => {
    const insights = []

    if (analytics.msiTrend > 5) {
      insights.push({
        title: "Rapid Spiritual Evolution",
        text: "Your MSI has increased significantly, indicating accelerated spiritual growth and heightened awareness."
      })
    }

    if (analytics.coherenceScore > 80) {
      insights.push({
        title: "Exceptional Mirror Coherence",
        text: "Your emotional and somatic mirrors are in remarkable harmony, suggesting deep self-awareness and integration."
      })
    }

    if (analytics.alignmentScore > 85) {
      insights.push({
        title: "Cosmic Alignment Achieved",
        text: "Your planetary gear alignments indicate you're in sync with cosmic energies for manifestation and flow."
      })
    }

    if (analytics.stabilityIndex > 90) {
      insights.push({
        title: "Profound Stability",
        text: "Your harmonic patterns show exceptional consistency, indicating mastery of your spiritual practices."
      })
    }

    return insights
  }, [analytics])

  const renderOverview = () => (
    <div>
      <MetricsGrid>
        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MetricValue>{harmonicProfile.msi.toFixed(1)}</MetricValue>
          <MetricLabel>Master Synthesis Index</MetricLabel>
          <MetricChange positive={analytics.msiTrend > 0}>
            {analytics.msiTrend > 0 ? '+' : ''}{analytics.msiTrend.toFixed(1)}% trend
          </MetricChange>
        </MetricCard>

        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MetricValue>{analytics.coherenceScore.toFixed(1)}</MetricValue>
          <MetricLabel>Mirror Coherence</MetricLabel>
          <MetricChange positive={analytics.coherenceScore > 70}>
            {analytics.coherenceScore > 70 ? 'Excellent' : 'Developing'}
          </MetricChange>
        </MetricCard>

        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MetricValue>{analytics.alignmentScore.toFixed(1)}</MetricValue>
          <MetricLabel>Cosmic Alignment</MetricLabel>
          <MetricChange positive={analytics.alignmentScore > 75}>
            {analytics.alignmentScore > 75 ? 'Aligned' : 'Adjusting'}
          </MetricChange>
        </MetricCard>

        <MetricCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MetricValue>{analytics.stabilityIndex.toFixed(1)}</MetricValue>
          <MetricLabel>Stability Index</MetricLabel>
          <MetricChange positive={analytics.stabilityIndex > 80}>
            {analytics.stabilityIndex > 80 ? 'Stable' : 'Evolving'}
          </MetricChange>
        </MetricCard>
      </MetricsGrid>

      <ChartContainer>
        <ChartTitle>Harmonic Distribution</ChartTitle>
        {harmonicProfile.mirrorStates.map((mirror, index) => (
          <div key={mirror.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#d4af37', fontSize: '0.9rem' }}>{mirror.type}</span>
              <span style={{ color: '#b8b8c4', fontSize: '0.8rem' }}>{mirror.intensity.toFixed(1)}%</span>
            </div>
            <ProgressBar>
              <ProgressFill
                value={mirror.intensity}
                color={`hsl(${45 + index * 60}, 70%, 60%)`}
                initial={{ width: 0 }}
                animate={{ width: `${mirror.intensity}%` }}
                transition={{ duration: 1, delay: 0.1 * index }}
              />
            </ProgressBar>
          </div>
        ))}
      </ChartContainer>
    </div>
  )

  const renderInsights = () => (
    <div>
      {insights.map((insight, index) => (
        <InsightCard
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <InsightTitle>{insight.title}</InsightTitle>
          <InsightText>{insight.text}</InsightText>
        </InsightCard>
      ))}
      
      {insights.length === 0 && (
        <InsightCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <InsightTitle>Continue Your Journey</InsightTitle>
          <InsightText>
            Your harmonic profile is developing beautifully. Continue your spiritual practices 
            to unlock deeper insights and achieve greater synthesis.
          </InsightText>
        </InsightCard>
      )}
    </div>
  )

  return (
    <AnalyticsContainer
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Harmonic Analytics</Title>
        <TabContainer>
          {(['overview', 'insights'] as AnalyticsTab[]).map((tab) => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Tab>
          ))}
        </TabContainer>
      </Header>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderOverview()}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderInsights()}
          </motion.div>
        )}
      </AnimatePresence>
    </AnalyticsContainer>
  )
}
