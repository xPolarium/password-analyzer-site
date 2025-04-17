import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

import { ModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<ModeToggle />
			<div className="flex w-full max-w-sm flex-col gap-6">
				<LoginForm />
			</div>
		</div>
	);
}
