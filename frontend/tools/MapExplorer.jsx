import React, { useState } from 'react';
import USRegionsMap from '../components/maps/USRegionsMap.jsx';
import { MAP_SCENARIOS } from '../data/social/map_scenarios.js';

/**
 * Simple map visualizer component
 */
const MapVisualizer = ({ imageKey, title }) => {
  const mapContent = {
    us_regions_basic: (
      <div className="w-full">
        <USRegionsMap
          selectedRegion={null}
          onRegionSelect={() => {}}
          disabled={false}
          showLabels={true}
        />
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
          Hover a state to see regional grouping; click selects region.
        </p>
      </div>
    ),
    world_continents: (
      <svg viewBox="0 0 1000 500" className="w-full h-full">
        {/* Ocean */}
        <rect width="1000" height="500" fill="#a5d8dd" />

        {/* North America */}
        <path
          d="M 80 80 L 120 60 L 160 55 L 190 65 L 210 85 L 220 110 L 215 140 L 200 170 L 180 190 L 150 200 L 120 195 L 95 180 L 75 155 L 65 125 L 70 100 Z M 130 210 L 160 205 L 185 215 L 200 235 L 205 260 L 195 285 L 175 300 L 145 305 L 120 295 L 105 275 L 100 250 L 108 225 Z"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="2"
        />

        {/* South America */}
        <path
          d="M 220 290 L 245 285 L 265 295 L 275 315 L 280 345 L 278 375 L 270 405 L 255 430 L 235 445 L 210 450 L 190 442 L 180 420 L 178 395 L 182 370 L 190 345 L 205 320 Z"
          fill="#fb923c"
          stroke="#9a3412"
          strokeWidth="2"
        />

        {/* Europe */}
        <path
          d="M 450 95 L 485 90 L 515 95 L 540 105 L 555 120 L 560 140 L 550 160 L 530 170 L 505 172 L 480 165 L 460 150 L 448 130 L 447 110 Z"
          fill="#c084fc"
          stroke="#6b21a8"
          strokeWidth="2"
        />

        {/* Africa */}
        <path
          d="M 480 185 L 520 180 L 555 190 L 580 210 L 595 240 L 600 275 L 595 310 L 580 345 L 555 370 L 525 385 L 490 390 L 460 380 L 440 360 L 430 330 L 432 295 L 443 260 L 460 230 L 475 205 Z"
          fill="#86efac"
          stroke="#166534"
          strokeWidth="2"
        />

        {/* Asia */}
        <path
          d="M 565 65 L 620 60 L 680 65 L 740 75 L 790 90 L 830 110 L 860 135 L 880 165 L 890 200 L 885 235 L 870 265 L 845 285 L 810 295 L 770 298 L 730 292 L 690 280 L 655 260 L 625 235 L 605 205 L 595 175 L 593 145 L 600 115 L 615 90 L 635 75 Z M 850 215 L 870 210 L 885 220 L 890 238 L 883 255 L 868 262 L 853 258 L 845 245 L 847 228 Z M 800 305 L 825 300 L 845 310 L 852 328 L 845 345 L 825 352 L 805 348 L 795 330 Z"
          fill="#fcd34d"
          stroke="#92400e"
          strokeWidth="2"
        />

        {/* Australia */}
        <path
          d="M 770 340 L 810 335 L 845 345 L 870 365 L 880 390 L 875 415 L 855 432 L 825 438 L 795 432 L 770 418 L 757 395 L 758 370 Z"
          fill="#f472b6"
          stroke="#831843"
          strokeWidth="2"
        />

        {/* Antarctica */}
        <path
          d="M 150 460 L 850 460 L 840 475 L 750 485 L 600 488 L 450 485 L 300 482 L 160 475 Z"
          fill="#e0e7ff"
          stroke="#4c1d95"
          strokeWidth="2"
        />

        {/* Labels */}
        <text x="130" y="150" fontSize="18" fontWeight="bold" fill="#78350f">
          North America
        </text>
        <text x="180" y="350" fontSize="16" fontWeight="bold" fill="#7c2d12">
          South America
        </text>
        <text x="470" y="135" fontSize="16" fontWeight="bold" fill="#581c87">
          Europe
        </text>
        <text x="490" y="290" fontSize="18" fontWeight="bold" fill="#14532d">
          Africa
        </text>
        <text x="700" y="200" fontSize="20" fontWeight="bold" fill="#78350f">
          Asia
        </text>
        <text x="790" y="390" fontSize="16" fontWeight="bold" fill="#831843">
          Australia
        </text>
      </svg>
    ),
    us_rivers: (
      <svg viewBox="0 0 960 600" className="w-full h-full">
        {/* Base map */}
        <rect width="960" height="600" fill="#fef3c7" />

        {/* US outline simplified */}
        <path
          d="M 100 150 L 150 120 L 200 110 L 250 115 L 300 130 L 350 145 L 400 155 L 450 160 L 500 165 L 550 170 L 600 180 L 650 195 L 700 210 L 750 230 L 780 250 L 800 280 L 810 320 L 805 360 L 790 395 L 760 425 L 720 445 L 670 458 L 620 465 L 570 468 L 520 465 L 470 458 L 420 450 L 370 440 L 320 428 L 270 415 L 220 400 L 170 380 L 130 355 L 105 325 L 95 290 L 95 250 L 98 210 Z"
          fill="#d4d4d8"
          stroke="#52525b"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Mississippi River */}
        <path
          d="M 420 110 Q 415 150, 410 190 Q 408 230, 405 270 Q 402 310, 398 350 Q 395 390, 390 430 Q 387 460, 383 490"
          stroke="#1e40af"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Missouri River */}
        <path
          d="M 280 180 Q 310 170, 340 165 Q 370 162, 400 168 Q 415 172, 418 185"
          stroke="#2563eb"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ohio River */}
        <path
          d="M 510 260 Q 490 265, 470 272 Q 450 280, 430 288 Q 418 293, 408 295"
          stroke="#3b82f6"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Arkansas River */}
        <path
          d="M 320 300 Q 345 295, 370 298 Q 390 301, 402 308"
          stroke="#60a5fa"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Red River */}
        <path
          d="M 290 340 Q 320 342, 350 348 Q 375 353, 390 358"
          stroke="#93c5fd"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tennessee River */}
        <path
          d="M 500 310 Q 485 315, 470 322 Q 455 328, 442 332"
          stroke="#60a5fa"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Colorado River (West) */}
        <path
          d="M 180 240 Q 175 280, 172 320 Q 170 360, 168 400 Q 167 430, 165 460"
          stroke="#2563eb"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Columbia River */}
        <path
          d="M 120 140 Q 135 145, 150 152 Q 165 158, 180 160"
          stroke="#3b82f6"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Labels */}
        <text x="425" y="300" fontSize="16" fontWeight="bold" fill="#1e3a8a">
          Mississippi River
        </text>
        <text x="330" y="160" fontSize="14" fontWeight="bold" fill="#1e40af">
          Missouri River
        </text>
        <text x="450" y="268" fontSize="14" fontWeight="bold" fill="#1e40af">
          Ohio River
        </text>
        <text x="315" y="285" fontSize="12" fontWeight="bold" fill="#1e40af">
          Arkansas R.
        </text>
        <text x="300" y="370" fontSize="12" fontWeight="bold" fill="#1e40af">
          Red River
        </text>
        <text x="130" y="320" fontSize="13" fontWeight="bold" fill="#1e40af">
          Colorado R.
        </text>
        <text x="130" y="135" fontSize="13" fontWeight="bold" fill="#1e40af">
          Columbia R.
        </text>

        {/* Legend */}
        <rect
          x="750"
          y="100"
          width="180"
          height="120"
          fill="white"
          stroke="#52525b"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="840"
          y="125"
          fontSize="16"
          fontWeight="bold"
          fill="#1e3a8a"
          textAnchor="middle"
        >
          Major US Rivers
        </text>
        <line
          x1="765"
          y1="145"
          x2="795"
          y2="145"
          stroke="#1e40af"
          strokeWidth="6"
        />
        <text x="805" y="150" fontSize="12" fill="#1f2937">
          Large Rivers
        </text>
        <line
          x1="765"
          y1="170"
          x2="795"
          y2="170"
          stroke="#3b82f6"
          strokeWidth="5"
        />
        <text x="805" y="175" fontSize="12" fill="#1f2937">
          Medium Rivers
        </text>
        <line
          x1="765"
          y1="195"
          x2="795"
          y2="195"
          stroke="#60a5fa"
          strokeWidth="4"
        />
        <text x="805" y="200" fontSize="12" fill="#1f2937">
          Tributaries
        </text>
      </svg>
    ),
    triangular_trade_routes: (
      <svg viewBox="0 0 800 500" className="w-full h-full">
        {/* Atlantic Ocean */}
        <rect width="800" height="500" fill="#93c5fd" />

        {/* Europe (Portugal, Spain, Britain) */}
        <path
          d="M 550 80 L 600 75 L 640 85 L 670 105 L 680 130 L 670 155 L 645 170 L 610 175 L 575 165 L 555 145 L 548 115 Z"
          fill="#c084fc"
          stroke="#6b21a8"
          strokeWidth="2"
        />

        {/* West Africa (Gold Coast, Slave Coast) */}
        <path
          d="M 520 280 L 560 275 L 595 285 L 620 305 L 635 330 L 640 360 L 630 390 L 605 410 L 570 420 L 535 415 L 510 395 L 500 365 L 505 335 L 515 305 Z"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="2"
        />

        {/* Caribbean & Americas */}
        <path
          d="M 150 200 L 200 190 L 250 200 L 280 220 L 290 250 L 285 280 L 265 305 L 230 315 L 190 310 L 160 290 L 145 260 L 145 230 Z"
          fill="#86efac"
          stroke="#166534"
          strokeWidth="2"
        />

        {/* Trade Route 1: Europe to Africa (Manufactured goods) */}
        <path
          d="M 610 175 Q 580 210, 560 250 L 540 280"
          stroke="#dc2626"
          strokeWidth="5"
          fill="none"
          strokeDasharray="8,4"
          markerEnd="url(#arrow1)"
        />

        {/* Trade Route 2: Africa to Americas (Enslaved people - Middle Passage) */}
        <path
          d="M 520 360 Q 400 340, 280 310 L 220 290"
          stroke="#7c2d12"
          strokeWidth="6"
          fill="none"
          strokeDasharray="8,4"
          markerEnd="url(#arrow2)"
        />

        {/* Trade Route 3: Americas to Europe (Sugar, tobacco, cotton) */}
        <path
          d="M 250 200 Q 380 140, 510 120 L 560 110"
          stroke="#059669"
          strokeWidth="5"
          fill="none"
          strokeDasharray="8,4"
          markerEnd="url(#arrow3)"
        />

        {/* Labels */}
        <text
          x="610"
          y="130"
          fontSize="18"
          fontWeight="bold"
          fill="#581c87"
          textAnchor="middle"
        >
          Europe
        </text>
        <text
          x="570"
          y="360"
          fontSize="18"
          fontWeight="bold"
          fill="#78350f"
          textAnchor="middle"
        >
          West Africa
        </text>
        <text
          x="220"
          y="255"
          fontSize="18"
          fontWeight="bold"
          fill="#14532d"
          textAnchor="middle"
        >
          Americas
        </text>

        {/* Trade goods labels */}
        <text x="550" y="220" fontSize="11" fill="#7f1d1d" fontWeight="bold">
          Goods →
        </text>
        <text x="350" y="310" fontSize="11" fill="#7c2d12" fontWeight="bold">
          ← Enslaved People
        </text>
        <text x="380" y="160" fontSize="11" fill="#065f46" fontWeight="bold">
          Raw Materials →
        </text>

        {/* Legend */}
        <rect
          x="20"
          y="20"
          width="200"
          height="110"
          fill="white"
          stroke="#1f2937"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="120"
          y="42"
          fontSize="14"
          fontWeight="bold"
          fill="#1f2937"
          textAnchor="middle"
        >
          Triangular Trade
        </text>
        <line
          x1="30"
          y1="55"
          x2="70"
          y2="55"
          stroke="#dc2626"
          strokeWidth="4"
          strokeDasharray="6,3"
        />
        <text x="80" y="60" fontSize="11" fill="#1f2937">
          Manufactured Goods
        </text>
        <line
          x1="30"
          y1="75"
          x2="70"
          y2="75"
          stroke="#7c2d12"
          strokeWidth="4"
          strokeDasharray="6,3"
        />
        <text x="80" y="80" fontSize="11" fill="#1f2937">
          Enslaved People
        </text>
        <line
          x1="30"
          y1="95"
          x2="70"
          y2="95"
          stroke="#059669"
          strokeWidth="4"
          strokeDasharray="6,3"
        />
        <text x="80" y="100" fontSize="11" fill="#1f2937">
          Raw Materials
        </text>
        <text
          x="120"
          y="120"
          fontSize="9"
          fill="#6b7280"
          textAnchor="middle"
          fontStyle="italic"
        >
          1500s-1800s
        </text>

        <defs>
          <marker
            id="arrow1"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
          </marker>
          <marker
            id="arrow2"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#7c2d12" />
          </marker>
          <marker
            id="arrow3"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#059669" />
          </marker>
        </defs>
      </svg>
    ),
    asia_map: (
      <svg viewBox="0 0 900 600" className="w-full h-full">
        {/* Ocean */}
        <rect width="900" height="600" fill="#bae6fd" />

        {/* Main Asia landmass */}
        <path
          d="M 100 180 L 150 150 L 200 130 L 260 120 L 320 125 L 380 135 L 440 150 L 500 165 L 560 185 L 620 210 L 680 240 L 730 275 L 770 315 L 800 360 L 820 410 L 825 460 L 810 500 L 780 530 L 740 545 L 690 550 L 640 545 L 590 535 L 540 520 L 490 500 L 440 475 L 390 445 L 340 410 L 290 370 L 240 330 L 190 290 L 150 250 L 120 210 Z
              M 730 190 L 765 185 L 795 195 L 815 215 L 825 240 L 820 270 L 800 290 L 770 298 L 740 295 L 715 280 L 705 255 L 710 225 L 720 205 Z
              M 620 480 L 650 475 L 675 485 L 690 505 L 692 530 L 680 550 L 655 560 L 628 555 L 610 535 L 608 510 L 615 490 Z"
          fill="#fef08a"
          stroke="#a16207"
          strokeWidth="2"
        />

        {/* Middle East region (lighter) */}
        <path
          d="M 100 180 L 150 170 L 200 175 L 240 195 L 260 225 L 265 260 L 255 295 L 230 320 L 195 330 L 160 325 L 130 305 L 110 275 L 100 240 L 102 210 Z"
          fill="#fde047"
          stroke="#a16207"
          strokeWidth="1.5"
        />

        {/* South Asia (India) */}
        <path
          d="M 340 280 L 375 275 L 405 285 L 425 310 L 435 345 L 430 380 L 410 410 L 380 425 L 350 420 L 325 400 L 315 370 L 318 340 L 328 310 Z"
          fill="#bef264"
          stroke="#365314"
          strokeWidth="1.5"
        />

        {/* East Asia (China) */}
        <path
          d="M 500 165 L 550 160 L 600 170 L 640 190 L 670 220 L 685 255 L 690 295 L 680 335 L 655 365 L 620 380 L 580 385 L 545 375 L 515 355 L 495 325 L 485 290 L 488 250 L 500 210 L 515 185 Z"
          fill="#fca5a5"
          stroke="#7f1d1d"
          strokeWidth="1.5"
        />

        {/* Southeast Asia */}
        <path
          d="M 540 400 L 570 395 L 595 405 L 610 425 L 615 450 L 605 475 L 585 490 L 560 492 L 538 482 L 528 460 L 530 435 L 537 415 Z"
          fill="#c084fc"
          stroke="#6b21a8"
          strokeWidth="1.5"
        />

        {/* Major cities marked */}
        <circle cx="180" cy="250" r="6" fill="#dc2626" />
        <circle cx="380" cy="350" r="6" fill="#dc2626" />
        <circle cx="600" cy="280" r="6" fill="#dc2626" />
        <circle cx="730" cy="220" r="6" fill="#dc2626" />
        <circle cx="575" cy="440" r="6" fill="#dc2626" />

        {/* Labels */}
        <text
          x="450"
          y="280"
          fontSize="28"
          fontWeight="bold"
          fill="#713f12"
          textAnchor="middle"
        >
          ASIA
        </text>
        <text x="170" y="230" fontSize="14" fontWeight="bold" fill="#78350f">
          Middle East
        </text>
        <text x="360" y="360" fontSize="14" fontWeight="bold" fill="#3f6212">
          South Asia
        </text>
        <text x="600" y="270" fontSize="14" fontWeight="bold" fill="#7f1d1d">
          East Asia
        </text>
        <text x="570" y="445" fontSize="12" fontWeight="bold" fill="#581c87">
          SE Asia
        </text>
        <text x="730" y="210" fontSize="12" fontWeight="bold" fill="#7f1d1d">
          Japan
        </text>

        {/* Legend */}
        <rect
          x="20"
          y="20"
          width="160"
          height="80"
          fill="white"
          stroke="#1f2937"
          strokeWidth="2"
          rx="6"
        />
        <text
          x="100"
          y="42"
          fontSize="14"
          fontWeight="bold"
          fill="#1f2937"
          textAnchor="middle"
        >
          Asia Regions
        </text>
        <circle cx="35" cy="55" r="4" fill="#dc2626" />
        <text x="50" y="60" fontSize="11" fill="#1f2937">
          Major Cities
        </text>
        <rect
          x="30"
          y="68"
          width="15"
          height="10"
          fill="#fef08a"
          stroke="#a16207"
        />
        <text x="50" y="77" fontSize="11" fill="#1f2937">
          Continental Asia
        </text>
      </svg>
    ),
    colonial_america: (
      <svg viewBox="0 0 700 600" className="w-full h-full">
        {/* Atlantic Ocean */}
        <rect width="700" height="600" fill="#93c5fd" />

        {/* 13 Colonies along the coast */}
        <path
          d="M 400 100 L 430 95 L 455 100 L 475 110 L 490 125 L 500 145 L 505 170 L 505 200 L 500 230 L 490 260 L 475 290 L 460 320 L 445 350 L 430 380 L 415 410 L 400 440 L 385 465 L 370 485 L 355 500 L 340 510 L 325 515 L 310 512 L 300 500 L 295 480 L 295 455 L 300 425 L 310 395 L 320 365 L 330 335 L 340 305 L 350 275 L 360 245 L 370 215 L 380 185 L 390 155 L 395 125 Z"
          fill="#fca5a5"
          stroke="#dc2626"
          strokeWidth="2.5"
        />

        {/* Native American territories (west) */}
        <path
          d="M 80 150 L 150 140 L 220 145 L 280 160 L 320 185 L 340 215 L 350 250 L 355 290 L 350 330 L 340 370 L 320 410 L 290 445 L 250 470 L 210 485 L 170 490 L 130 485 L 100 470 L 80 445 L 70 410 L 68 370 L 72 330 L 78 290 L 85 250 L 90 210 L 88 175 Z"
          fill="#bef264"
          stroke="#65a30d"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* French territories (north) */}
        <path
          d="M 200 50 L 280 45 L 360 55 L 420 70 L 390 100 L 350 110 L 310 115 L 270 110 L 230 95 L 210 75 Z"
          fill="#c084fc"
          stroke="#6b21a8"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Spanish Florida (south) */}
        <path
          d="M 300 520 L 350 515 L 400 525 L 440 545 L 460 570 L 455 590 L 425 595 L 385 590 L 345 580 L 315 560 L 305 540 Z"
          fill="#fef08a"
          stroke="#a16207"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Major colonial cities */}
        <circle cx="420" cy="140" r="6" fill="#7f1d1d" />
        <text x="435" y="145" fontSize="13" fontWeight="bold" fill="#7f1d1d">
          Boston
        </text>

        <circle cx="430" cy="220" r="6" fill="#7f1d1d" />
        <text x="445" y="225" fontSize="13" fontWeight="bold" fill="#7f1d1d">
          New York
        </text>

        <circle cx="425" cy="300" r="6" fill="#7f1d1d" />
        <text x="440" y="305" fontSize="13" fontWeight="bold" fill="#7f1d1d">
          Philadelphia
        </text>

        <circle cx="405" cy="410" r="6" fill="#7f1d1d" />
        <text x="420" y="415" fontSize="13" fontWeight="bold" fill="#7f1d1d">
          Charleston
        </text>

        {/* Regional labels */}
        <text x="440" y="180" fontSize="16" fontWeight="bold" fill="#991b1b">
          New England
        </text>
        <text x="450" y="260" fontSize="16" fontWeight="bold" fill="#991b1b">
          Middle Colonies
        </text>
        <text x="440" y="380" fontSize="16" fontWeight="bold" fill="#991b1b">
          Southern Colonies
        </text>

        <text x="190" y="300" fontSize="18" fontWeight="bold" fill="#3f6212">
          Native American
        </text>
        <text x="210" y="325" fontSize="18" fontWeight="bold" fill="#3f6212">
          Territories
        </text>

        <text x="290" y="75" fontSize="14" fontWeight="bold" fill="#581c87">
          French Canada
        </text>
        <text x="370" y="565" fontSize="14" fontWeight="bold" fill="#78350f">
          Spanish Florida
        </text>

        {/* Legend */}
        <rect
          x="20"
          y="20"
          width="200"
          height="140"
          fill="white"
          stroke="#1f2937"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="120"
          y="45"
          fontSize="16"
          fontWeight="bold"
          fill="#1f2937"
          textAnchor="middle"
        >
          Colonial America
        </text>
        <text
          x="120"
          y="65"
          fontSize="11"
          fill="#6b7280"
          textAnchor="middle"
          fontStyle="italic"
        >
          circa 1770
        </text>

        <rect
          x="30"
          y="75"
          width="20"
          height="15"
          fill="#fca5a5"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="58" y="87" fontSize="12" fill="#1f2937">
          13 British Colonies
        </text>

        <rect
          x="30"
          y="95"
          width="20"
          height="15"
          fill="#bef264"
          stroke="#65a30d"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <text x="58" y="107" fontSize="12" fill="#1f2937">
          Native Lands
        </text>

        <rect
          x="30"
          y="115"
          width="20"
          height="15"
          fill="#c084fc"
          stroke="#6b21a8"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <text x="58" y="127" fontSize="12" fill="#1f2937">
          French Territory
        </text>

        <rect
          x="30"
          y="135"
          width="20"
          height="15"
          fill="#fef08a"
          stroke="#a16207"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <text x="58" y="147" fontSize="12" fill="#1f2937">
          Spanish Territory
        </text>
      </svg>
    ),
    us_time_zones: (
      <svg viewBox="0 0 960 500" className="w-full h-full">
        {/* Background */}
        <rect width="960" height="500" fill="#f0fdf4" />

        {/* Ocean borders */}
        <rect x="0" y="0" width="80" height="500" fill="#bae6fd" />
        <rect x="880" y="0" width="80" height="500" fill="#bae6fd" />

        {/* Pacific Time Zone (PST/PDT UTC-8/-7) */}
        <path
          d="M 80 120 L 120 100 L 150 95 L 180 100 L 200 115 L 210 140 L 215 170 L 215 210 L 210 250 L 200 290 L 185 330 L 165 365 L 140 390 L 110 405 L 85 400 L 80 370 L 78 330 L 80 290 L 82 250 L 83 210 L 82 170 L 80 140 Z"
          fill="#fecaca"
          opacity="0.8"
          stroke="#dc2626"
          strokeWidth="2"
        />

        {/* Mountain Time Zone (MST/MDT UTC-7/-6) */}
        <path
          d="M 215 100 L 260 95 L 300 100 L 335 110 L 365 125 L 390 145 L 405 170 L 410 200 L 410 240 L 405 280 L 395 320 L 380 355 L 360 385 L 335 405 L 305 415 L 270 415 L 240 405 L 220 385 L 210 350 L 208 310 L 210 270 L 213 230 L 215 190 L 216 150 L 215 120 Z"
          fill="#fed7aa"
          opacity="0.8"
          stroke="#ea580c"
          strokeWidth="2"
        />

        {/* Central Time Zone (CST/CDT UTC-6/-5) */}
        <path
          d="M 410 110 L 465 105 L 520 110 L 570 120 L 610 135 L 640 155 L 660 180 L 670 210 L 675 245 L 675 285 L 670 325 L 655 365 L 635 395 L 610 415 L 575 428 L 535 435 L 495 433 L 460 423 L 430 405 L 415 380 L 408 350 L 407 315 L 409 280 L 411 245 L 412 210 L 412 175 L 411 140 Z"
          fill="#fef08a"
          opacity="0.8"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Eastern Time Zone (EST/EDT UTC-5/-4) */}
        <path
          d="M 675 130 L 730 120 L 780 125 L 820 140 L 850 165 L 870 200 L 878 240 L 880 285 L 875 330 L 860 370 L 835 400 L 800 420 L 760 430 L 720 432 L 685 422 L 665 400 L 655 370 L 652 335 L 653 300 L 656 265 L 660 230 L 665 195 L 670 160 Z"
          fill="#d9f99d"
          opacity="0.8"
          stroke="#65a30d"
          strokeWidth="2"
        />

        {/* Time zone dividing lines */}
        <line
          x1="215"
          y1="95"
          x2="215"
          y2="420"
          stroke="#7f1d1d"
          strokeWidth="3"
          strokeDasharray="10,5"
        />
        <line
          x1="410"
          y1="105"
          x2="410"
          y2="435"
          stroke="#7c2d12"
          strokeWidth="3"
          strokeDasharray="10,5"
        />
        <line
          x1="675"
          y1="125"
          x2="675"
          y2="435"
          stroke="#713f12"
          strokeWidth="3"
          strokeDasharray="10,5"
        />

        {/* Time zone labels */}
        <text
          x="145"
          y="260"
          fontSize="24"
          fontWeight="bold"
          fill="#7f1d1d"
          textAnchor="middle"
        >
          Pacific
        </text>
        <text
          x="145"
          y="290"
          fontSize="16"
          fontWeight="bold"
          fill="#991b1b"
          textAnchor="middle"
        >
          PST/PDT
        </text>
        <text x="145" y="315" fontSize="14" fill="#7f1d1d" textAnchor="middle">
          UTC-8/-7
        </text>

        <text
          x="310"
          y="260"
          fontSize="24"
          fontWeight="bold"
          fill="#7c2d12"
          textAnchor="middle"
        >
          Mountain
        </text>
        <text
          x="310"
          y="290"
          fontSize="16"
          fontWeight="bold"
          fill="#9a3412"
          textAnchor="middle"
        >
          MST/MDT
        </text>
        <text x="310" y="315" fontSize="14" fill="#7c2d12" textAnchor="middle">
          UTC-7/-6
        </text>

        <text
          x="540"
          y="260"
          fontSize="24"
          fontWeight="bold"
          fill="#713f12"
          textAnchor="middle"
        >
          Central
        </text>
        <text
          x="540"
          y="290"
          fontSize="16"
          fontWeight="bold"
          fill="#854d0e"
          textAnchor="middle"
        >
          CST/CDT
        </text>
        <text x="540" y="315" fontSize="14" fill="#713f12" textAnchor="middle">
          UTC-6/-5
        </text>

        <text
          x="770"
          y="260"
          fontSize="24"
          fontWeight="bold"
          fill="#3f6212"
          textAnchor="middle"
        >
          Eastern
        </text>
        <text
          x="770"
          y="290"
          fontSize="16"
          fontWeight="bold"
          fill="#4d7c0f"
          textAnchor="middle"
        >
          EST/EDT
        </text>
        <text x="770" y="315" fontSize="14" fill="#3f6212" textAnchor="middle">
          UTC-5/-4
        </text>

        {/* Example cities */}
        <circle cx="140" cy="200" r="5" fill="#dc2626" />
        <text
          x="140"
          y="185"
          fontSize="11"
          fill="#7f1d1d"
          textAnchor="middle"
          fontWeight="bold"
        >
          LA
        </text>

        <circle cx="305" cy="220" r="5" fill="#ea580c" />
        <text
          x="305"
          y="205"
          fontSize="11"
          fill="#7c2d12"
          textAnchor="middle"
          fontWeight="bold"
        >
          Denver
        </text>

        <circle cx="520" cy="230" r="5" fill="#ca8a04" />
        <text
          x="520"
          y="215"
          fontSize="11"
          fill="#713f12"
          textAnchor="middle"
          fontWeight="bold"
        >
          Chicago
        </text>

        <circle cx="800" cy="210" r="5" fill="#65a30d" />
        <text
          x="800"
          y="195"
          fontSize="11"
          fill="#3f6212"
          textAnchor="middle"
          fontWeight="bold"
        >
          NYC
        </text>

        {/* Title */}
        <rect
          x="320"
          y="30"
          width="320"
          height="50"
          fill="white"
          stroke="#1f2937"
          strokeWidth="2"
          rx="8"
        />
        <text
          x="480"
          y="62"
          fontSize="22"
          fontWeight="bold"
          fill="#1f2937"
          textAnchor="middle"
        >
          United States Time Zones
        </text>
      </svg>
    ),
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {mapContent[imageKey] || (
        <div className="text-center">
          <div className="text-6xl mb-3">🗺️</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p className="font-semibold">{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * MapExplorer - Geography & Map-Reading Tool
 * Allows students to practice interpreting maps like those in GED Social Studies
 */
export default function MapExplorer({ onExit }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentScenario = MAP_SCENARIOS[currentScenarioIndex];

  const handleChoiceSelect = (choiceId) => {
    const choice = currentScenario.choices.find((c) => c.id === choiceId);
    setSelectedChoice(choiceId);

    const isCorrect = choice.isCorrect;
    setFeedback({
      isCorrect,
      correctChoiceId: currentScenario.choices.find((c) => c.isCorrect).id,
    });

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < MAP_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedChoice(null);
      setFeedback(null);
    } else {
      // End of cycle - show summary
      setSessionComplete(true);
    }
  };

  const handleResetSession = () => {
    setCurrentScenarioIndex(0);
    setCorrectCount(0);
    setSelectedChoice(null);
    setFeedback(null);
    setSessionComplete(false);
  };

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <span>← Back</span>
          </button>
          <h1 className="text-2xl font-bold">🗺️ Map Explorer</h1>
          <div className="w-20 text-right text-sm">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {currentScenarioIndex + 1}/{MAP_SCENARIOS.length}
            </div>
          </div>
        </div>

        {/* Session Summary */}
        {sessionComplete && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              ✅ Round Complete!
            </h2>
            <p className="text-lg text-emerald-800 dark:text-emerald-300 mb-4">
              You answered{' '}
              <strong>
                {correctCount} out of {MAP_SCENARIOS.length}
              </strong>{' '}
              correctly.
            </p>
            <button
              onClick={handleResetSession}
              className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
            >
              Start New Round
            </button>
          </div>
        )}

        {!sessionComplete && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Panel (Left) */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 min-h-64">
              <MapVisualizer
                imageKey={currentScenario.imageKey}
                title={currentScenario.title}
              />
            </div>

            {/* Question Panel (Right) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scenario Title & Tags */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{currentScenario.title}</h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      currentScenario.difficulty === 'easy'
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                        : currentScenario.difficulty === 'medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {currentScenario.difficulty.charAt(0).toUpperCase() +
                      currentScenario.difficulty.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentScenario.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {currentScenario.prompt}
                </p>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {currentScenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition font-semibold ${
                      selectedChoice === choice.id
                        ? feedback?.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                        : feedback && feedback.correctChoiceId === choice.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-500 cursor-pointer'
                    } ${feedback !== null ? 'cursor-default' : ''}`}
                  >
                    <span className="font-bold text-lg mr-3">{choice.id}.</span>
                    {choice.label}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`rounded-lg p-4 border ${
                    feedback.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-600'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                  }`}
                >
                  <p
                    className={`font-bold mb-2 ${
                      feedback.isCorrect
                        ? 'text-emerald-900 dark:text-emerald-200'
                        : 'text-red-900 dark:text-red-200'
                    }`}
                  >
                    {feedback.isCorrect ? '✅ Correct!' : '❌ Not quite'}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {currentScenario.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {feedback && (
                <button
                  onClick={handleNextScenario}
                  className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                >
                  {currentScenarioIndex === MAP_SCENARIOS.length - 1
                    ? 'See Results'
                    : 'Next Map'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
