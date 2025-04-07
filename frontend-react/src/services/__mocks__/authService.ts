const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
  getAuthHeader: jest.fn(),
};

export default mockAuthService;
