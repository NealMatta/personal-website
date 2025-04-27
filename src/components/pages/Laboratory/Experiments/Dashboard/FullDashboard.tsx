'use client';

import BarebonesCard from '@/src/components/reusable/cards/BarebonesCard';
import TrainAlertClient from '../ChicagoCTA/TrainAlertClient';
// import Quotes from '../../../Home/Quotes/Quotes';
import { useState } from 'react';

export default function FullDashboard() {
  const [isMorning, setIsMorning] = useState(true);

  return (
    <div className="w-full p-16">
      {/* Date & Time */}
      <div className="text-center text-8xl font-semibold mb-6 uppercase letter tracking-wide ">
        Sunday, April 6 2025 | 09:30 PM
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-wrap justify-between gap-y-5">
        {/* Train Alerts */}
        <div className="">
          <BarebonesCard title={'Chicago Red Line Stop'}>
            <TrainAlertClient />
          </BarebonesCard>
        </div>

        {/* <div className="mt-6">
            <Quotes />
          </div> */}
        <BarebonesCard title={isMorning ? 'Morning Routine' : 'Night Routine'}>
          <div className="mb-4">
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setIsMorning(!isMorning)}
            >
              Switch to {isMorning ? 'Night' : 'Morning'} Routine
            </button>
          </div>
          {isMorning ? (
            <ul className="space-y-2 text-lg">
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Wake up at 6:30 AM</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Brush teeth & shower</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Make breakfast</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Stretch or light workout</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Plan the day</span>
                </label>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2 text-lg">
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Prep for Tomorrow</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Clean out kitchen sink</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Vacuum Apartment</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Wipe down island</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Dental Hygiene</span>
                </label>
              </li>
            </ul>
          )}
        </BarebonesCard>

        <BarebonesCard title={'Weather'}>
          <div className="text-5xl font-bold mb-2 text-center">72°F</div>
          <div className="text-sm text-gray-600">
            Partly cloudy with light breeze. Feels like spring.
            <br />
            Bring a light jacket. No rain expected today.
          </div>
        </BarebonesCard>

        <BarebonesCard title={'Tasks Today'}>
          <ul className="space-y-2 text-lg">
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Wake up at 6:30 AM</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Brush teeth & shower</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Make breakfast</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Stretch or light workout</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Plan the day</span>
              </label>
            </li>
          </ul>
        </BarebonesCard>

        <BarebonesCard title={'Habits'}>
          <ul className="list-disc pl-6 text-lg space-y-1">
            <li>Gym 3x a week</li>
            <li>Do the night shift</li>
            <li>Meal prep</li>
            <li>No mids — only Ends or early nights</li>
          </ul>
        </BarebonesCard>
      </div>
    </div>
  );
}
