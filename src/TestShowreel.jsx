import ResponsiveShowreel from './components/ResponsiveShowreel';
import ShowreelPlayer from './components/ShowreelPlayer';

const TestShowreel = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Showreel Component Comparison
        </h1>
        
        {/* Updated ResponsiveShowreel with high-quality thumbnails */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Updated ResponsiveShowreel (with your thumbnails)</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <ResponsiveShowreel 
              desktopVideoId="1120469511"
              mobileVideoId="1120949925"
            />
          </div>
        </div>
        
        {/* New ShowreelPlayer component */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">New ShowreelPlayer Component</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <ShowreelPlayer />
          </div>
        </div>
        
        {/* Side by side comparison */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Side by Side Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium mb-3">ResponsiveShowreel</h3>
              <ResponsiveShowreel 
                desktopVideoId="1120469511"
                mobileVideoId="1120949925"
              />
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium mb-3">ShowreelPlayer</h3>
              <ShowreelPlayer />
            </div>
          </div>
        </div>
        
        {/* Mobile preview note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">📱 Mobile Testing</h3>
          <p className="text-blue-700 text-sm">
            To test mobile responsiveness, resize your browser window to less than 768px width, 
            or use browser dev tools to simulate mobile devices. The component will automatically 
            switch to 9:16 aspect ratio and use the mobile video ID (1120949925).
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestShowreel;
