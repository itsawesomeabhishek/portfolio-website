import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows field errors and does not open the mail client when invalid", async () => {
    const navigate = vi.fn();
    render(<ContactForm email="me@site.dev" navigate={navigate} />);
    await userEvent.setup().click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("aria-invalid", "true");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("opens a mailto link with encoded content when valid", async () => {
    const navigate = vi.fn();
    const user = userEvent.setup();
    render(<ContactForm email="me@site.dev" navigate={navigate} />);

    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/message/i), "Let's build something great.");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(navigate).toHaveBeenCalledTimes(1);
    const url = navigate.mock.calls[0][0] as string;
    expect(url.startsWith("mailto:me@site.dev?")).toBe(true);
    expect(url).toContain(encodeURIComponent("Let's build something great."));
    expect(screen.getByRole("status")).toHaveTextContent(/mail app/i);
  });

  it("clears an error once the field is corrected and resubmitted", async () => {
    const user = userEvent.setup();
    render(<ContactForm email="me@site.dev" navigate={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /send/i }));
    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(screen.queryByText("Enter your name.")).not.toBeInTheDocument();
  });
});
