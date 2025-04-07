import TrainAlertClient from '../ChicagoCTA/TrainAlertClient';

export default function FullDashboard() {
  return (
    <div className="w-full px-8 py-4">
      {/* Date & Time */}
      <div className="text-center text-2xl font-semibold mb-6 bg-red-700">
        Sunday, April 6 | 09:30 PM
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Train Alerts */}
        <div>
          <TrainAlertClient />
        </div>

        {/* Right: Hardcoded To-Do Lists */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Morning Routine</h2>
            <ul className="list-disc list-inside">
              <li>Wake up at 6:30 AM</li>
              <li>Brush teeth & shower</li>
              <li>Make breakfast</li>
              <li>Stretch or light workout</li>
              <li>Plan the day</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Evening Routine</h2>
            <ul className="list-disc list-inside">
              <li>Eat dinner</li>
              <li>Go for a walk</li>
              <li>Shower & skincare</li>
              <li>Read a book or journal</li>
              <li>Sleep by 11 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
