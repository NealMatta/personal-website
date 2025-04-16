import BarebonesCard from '@/src/components/reusable/cards/BarebonesCard';
import TrainAlertClient from '../ChicagoCTA/TrainAlertClient';
import Quotes from '../../../Home/Quotes/Quotes';

export default function FullDashboard() {
  return (
    <div className="w-full p-16">
      {/* Date & Time */}
      <div className="text-center text-8xl font-semibold mb-6 uppercase letter tracking-wide ">
        Sunday, April 6 2025 | 09:30 PM
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Train Alerts */}
        <section className="col-span-1">
          <BarebonesCard title={'Chicago Red Line Stop'}>
            <TrainAlertClient />
          </BarebonesCard>
          <div className="mt-6">
            <Quotes />
          </div>
        </section>

        {/* Right: Hardcoded To-Do Lists */}
        <section className="col-span-1">
          <div className="flex flex-wrap gap-6">
            <div className="">
              <BarebonesCard title={'Morning Routine'}>
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
            </div>
            <div className="">
              <BarebonesCard title={'Weather'}>
                <div className="text-5xl font-bold mb-2 text-center">72°F</div>
                <div className="text-sm text-gray-600">
                  Partly cloudy with light breeze. Feels like spring.
                  <br />
                  Bring a light jacket. No rain expected today.
                </div>
              </BarebonesCard>
            </div>
            <div className="">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
