const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
        <div className="border border-t-8 border-gray-300 rounded-full h-24 w-24 animate-spin"></div>
      </div>
    );
  };