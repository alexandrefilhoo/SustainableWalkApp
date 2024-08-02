
export const getWalkingPathCoordinates = async (pathId) => {
  // Mock data for walking path coordinates
  const mockCoordinates = {
    1: [
      { latitude: 51.5074, longitude: -0.1278 },
      { latitude: 51.5075, longitude: -0.1279 },
      { latitude: 51.5076, longitude: -0.128 },
    ],
  };

  return mockCoordinates[pathId] || [];
};
