"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

const apiUrl =
	process.env.NODE_ENV !== "production"
		? "http://localhost:5328"
		: "https://imaginative-sprinkles-8419a0.netlify.app";

export function LoginForm({ className, ...props }) {
	const [password, setPassword] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const checkPassStrength = async () => {
		if (!password.trim()) return;

		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch(`${apiUrl}/check?password=${password}`, {
				mode: "no-cors",
			});
			if (!res.ok) throw new Error(`Error ${res.status}`);

			const data = await res.json();
			setResult(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const COLORS = [
		"bg-very-weak",
		"bg-weak",
		"bg-medium",
		"bg-strong",
		"bg-very-strong",
	];

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">
						Password Analyzer
					</CardTitle>
					<CardDescription>
						See how strong your password is!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
							<span className="bg-card text-base relative z-10 px-2">
								Enter a password
							</span>
						</div>
						<div className="grid gap-6">
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password"></Label>
								</div>
								<Input
									type="text"
									placeholder="Enter your password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<Button
								onClick={checkPassStrength}
								className="w-full"
							>
								{loading ? "Checking..." : "Check strength"}
							</Button>
							{error && (
								<p className="text-red-500 mt-2">
									Error: {error}
								</p>
							)}

							{result && (
								<ul className="flex flex-col gap-2">
									{Object.entries(result).map(
										([key, value]) => (
											<ul className="">
												<Button
													className={cn(
														"w-full pointer-events-none",
														COLORS[value.predicted]
													)}
												>
													{key} : {value.predicted}
												</Button>
											</ul>
										)
									)}
								</ul>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
