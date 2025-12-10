import ShowreelPlayer from './ShowreelPlayer';

// Example usage of the ShowreelPlayer component
const ShowreelExample = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Koen Darras Showreel
        </h1>
        
        {/* Basic usage */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>
          <ShowreelPlayer />
        </div>
        
        {/* With custom styling */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">With Custom Styling</h2>
          <ShowreelPlayer className="max-w-4xl mx-auto shadow-2xl" />
        </div>
        
        {/* In a card layout */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">In Card Layout</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-4">Adventure Showreel</h3>
            <ShowreelPlayer />
            <p className="mt-4 text-gray-600">
              Experience Koen's incredible journey through mountains and oceans.
            </p>
          </div>
        </div>
        
        {/* Multiple instances */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Multiple Instances</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium mb-3">Showreel 1</h3>
              <ShowreelPlayer />
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-medium mb-3">Showreel 2</h3>
              <ShowreelPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowreelExample;
