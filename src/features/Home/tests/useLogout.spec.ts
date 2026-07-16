import { act, renderHook } from "@testing-library/react";
import { useLogout } from "../hooks/useLogout";

const mockReplace = jest.fn();
const mockRefresh = jest.fn();
const mockLogout = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, refresh: mockRefresh }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: (...args: unknown[]) => mockToastError(...args),
  },
}));

jest.mock("@/services/firebase/email-auth", () => ({
  logout: (...args: unknown[]) => mockLogout(...args),
  getFirebaseAuthErrorMessage: () => "Erro ao sair da conta",
}));

describe("useLogout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call logout function", async () => {
    mockLogout.mockResolvedValue(undefined);
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it("should call toast.success when logout is successful", async () => {
    mockLogout.mockResolvedValue(undefined);
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(mockToastSuccess).toHaveBeenCalledWith("Você saiu da conta");
    expect(mockReplace).toHaveBeenCalledWith("/login");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should call toast.error when logout fails", async () => {
    mockLogout.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro ao sair da conta");
    expect(mockReplace).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("should call replace and refresh when logout is successful", async () => {
    mockLogout.mockResolvedValue(undefined);
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current();
    });

    expect(mockReplace).toHaveBeenCalledWith("/login");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
