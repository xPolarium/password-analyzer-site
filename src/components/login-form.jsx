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

export function LoginForm({ className, ...props }) {
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
					<form>
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
										id="password"
										type="password"
										required
									/>
								</div>
								<Button type="submit" className="w-full">
									Check strength
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				Our service ensures end-to-end encryption of used passwords,
				ensuring our users from exposing their private information.
			</div>
		</div>
	);
}
