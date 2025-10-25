import { Checkbox } from "@radix-ui/react-checkbox";
import {
	AlertTriangle,
	ChevronDown,
	ChevronUp,
	Clock,
	FileText,
	Play,
	Settings,
	Target,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export default function LandingPage() {
	const navigate = useNavigate();

	// 🔧 STATE
	const [target, setTarget] = useState("");
	const [mode, setMode] = useState<"fast" | "deep" | "">("");
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [customFlags, setCustomFlags] = useState("");
	const [excludePaths, setExcludePaths] = useState("");
	const [maxDuration, setMaxDuration] = useState("");
	const [legalAccepted, setLegalAccepted] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState<{
		name: string;
		description: string;
		tools: string[];
		estimatedDuration: string;
	} | null>(null);

	// ⚙️ Handle Mode Change
	function handleModeChange(selected: "fast" | "deep") {
		setMode(selected);
		setSelectedTemplate(
			selected === "fast"
				? {
						name: "Fast Scan Template",
						description:
							"Performs quick reconnaissance, checking open ports and basic vulnerabilities.",
						tools: ["nmap", "whois", "subfinder"],
						estimatedDuration: "15–30 minutes",
					}
				: {
						name: "Deep Scan Template",
						description:
							"Comprehensive penetration testing including exploitation simulation.",
						tools: ["nmap", "nikto", "dirsearch", "metasploit"],
						estimatedDuration: "2–4 hours",
					},
		);
	}

	// 🚀 Start Scan
	function handleStartScan() {
		if (!legalAccepted || !target) {
			alert("Please accept the legal disclaimer and enter a target first!");
			return;
		}

		const payload = {
			target,
			mode,
			flags: customFlags,
			exclude: excludePaths,
			maxDuration,
			template: selectedTemplate,
			timestamp: new Date().toISOString(),
		};

		console.log("🚀 Starting scan:", payload);

		setTimeout(() => {
			alert(`✅ Scan started for ${target} (${mode} mode)!`);
			navigate("/dashboard");
		}, 1000);
	}

	return (
		<main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-8">
			{/* Header */}
			<div className="mb-10 text-center space-y-1">
				<h1 className="text-4xl font-bold text-white">Create New Scan</h1>
				<p className="text-slate-400 text-sm">
					Configure and launch a penetration testing job
				</p>
			</div>

			{/* Card */}
			<Card className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-sm border border-slate-800 shadow-xl">
				<CardHeader>
					<CardTitle className="text-white flex items-center gap-2">
						<Target className="w-5 h-5 text-cyan-400" />
						Target Configuration
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-8">
					{/* Target Input */}
					<div className="space-y-2">
						<Label
							htmlFor="target"
							className="text-slate-300 flex items-center gap-2"
						>
							<Target className="w-4 h-4 text-cyan-400" />
							Target Domain/IP
						</Label>
						<Input
							id="target"
							type="text"
							placeholder="example.com or 192.168.1.1"
							value={target}
							onChange={(e) => setTarget(e.target.value)}
							className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
						/>
						<p className="text-xs text-slate-500">
							Enter a domain or IP address you’re authorized to test
						</p>
					</div>

					{/* Mode Selection */}
					<div className="space-y-3">
						<Label className="text-slate-300 flex items-center gap-2">
							<Zap className="w-4 h-4 text-cyan-400" />
							Scan Mode
						</Label>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{/* Fast Scan */}
							<Button
								onClick={() => handleModeChange("fast")}
								className={`relative group flex flex-col justify-between h-full border rounded-2xl p-5 text-left transition-all duration-300
                ${
									mode === "fast"
										? "border-cyan-500/70 bg-gradient-to-br from-cyan-950/40 to-slate-900/50 shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]"
										: "border-slate-700 bg-slate-800/40 hover:border-cyan-400/50 hover:bg-slate-800/60"
								}`}
							>
								{mode === "fast" && (
									<div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-30 animate-pulse rounded-2xl pointer-events-none" />
								)}
								<div className="relative z-10 flex flex-col gap-3">
									<div className="flex items-center gap-2">
										<Zap className="w-5 h-5 text-cyan-400" />
										<h3 className="font-semibold text-white text-base tracking-tight">
											Fast Scan
										</h3>
									</div>
									<p className="text-sm text-slate-400 leading-relaxed">
										Quick reconnaissance with minimal intrusion
									</p>
								</div>
								<div className="relative z-10 flex items-center gap-1 text-xs text-slate-500 mt-3">
									<Clock className="w-3 h-3" />
									<span>15–30 minutes</span>
								</div>
							</Button>

							{/* Deep Scan */}
							<Button
								onClick={() => handleModeChange("deep")}
								className={`relative group flex flex-col justify-between h-full border rounded-2xl p-5 text-left transition-all duration-300
                ${
									mode === "deep"
										? "border-orange-500/70 bg-gradient-to-br from-orange-950/30 to-slate-900/50 shadow-[0_0_20px_-5px_rgba(251,146,60,0.4)]"
										: "border-slate-700 bg-slate-800/40 hover:border-orange-400/50 hover:bg-slate-800/60"
								}`}
							>
								{mode === "deep" && (
									<div className="absolute inset-0 bg-orange-500/10 blur-xl opacity-30 animate-pulse rounded-2xl pointer-events-none" />
								)}
								<div className="relative z-10 flex flex-col gap-3">
									<div className="flex items-center gap-2">
										<Settings className="w-5 h-5 text-orange-400" />
										<h3 className="font-semibold text-white text-base tracking-tight">
											Deep Scan
										</h3>
									</div>
									<p className="text-sm text-slate-400 leading-relaxed">
										Comprehensive testing with exploitation attempts
									</p>
								</div>
								<div className="relative z-10 flex items-center gap-1 text-xs text-slate-500 mt-3">
									<Clock className="w-3 h-3" />
									<span>2–4 hours</span>
								</div>
							</Button>
						</div>
					</div>

					{/* Template Preview */}
					{selectedTemplate && (
						<div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3">
							<h4 className="text-sm font-semibold text-white flex items-center gap-2">
								<FileText className="w-4 h-4 text-cyan-400" />
								Template: {selectedTemplate.name}
							</h4>
							<p className="text-sm text-slate-400">
								{selectedTemplate.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{selectedTemplate.tools.map((tool) => (
									<span
										key={tool}
										className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
									>
										{tool}
									</span>
								))}
							</div>
							<div className="flex items-center gap-2 text-xs text-slate-400">
								<Clock className="w-3 h-3" />
								<span>Estimated: {selectedTemplate.estimatedDuration}</span>
							</div>
						</div>
					)}

					{/* Advanced Options */}
					<div className="space-y-4">
						<Button
							onClick={() => setShowAdvanced(!showAdvanced)}
							className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
						>
							{showAdvanced ? (
								<ChevronUp className="w-4 h-4" />
							) : (
								<ChevronDown className="w-4 h-4" />
							)}
							<span className="text-sm font-medium">Advanced Options</span>
						</Button>

						{showAdvanced && (
							<div className="space-y-4 p-4 bg-slate-800/40 rounded-lg border border-slate-700">
								<div className="space-y-2">
									<Label
										htmlFor="customFlags"
										className="text-slate-300 text-sm"
									>
										Custom Flags
									</Label>
									<Textarea
										id="customFlags"
										placeholder="--threads 10 --timeout 30"
										value={customFlags}
										onChange={(e) => setCustomFlags(e.target.value)}
										className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 h-20"
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="excludePaths"
										className="text-slate-300 text-sm"
									>
										Exclude Paths
									</Label>
									<Input
										id="excludePaths"
										placeholder="/admin, /logout"
										value={excludePaths}
										onChange={(e) => setExcludePaths(e.target.value)}
										className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="maxDuration"
										className="text-slate-300 text-sm"
									>
										Max Duration (hours)
									</Label>
									<Input
										id="maxDuration"
										type="number"
										placeholder="4"
										value={maxDuration}
										onChange={(e) => setMaxDuration(e.target.value)}
										className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
									/>
								</div>
							</div>
						)}
					</div>

					{/* Legal Notice */}
					<Alert className="bg-orange-950/30 border-orange-800/50 mt-6">
						<AlertTriangle className="h-4 w-4 text-orange-400" />
						<AlertDescription className="text-orange-300 space-y-3">
							<p className="font-semibold">
								Legal Responsibility & Authorization
							</p>
							<p className="text-sm leading-relaxed text-orange-200/80">
								By proceeding, you confirm that you have explicit authorization
								to perform security testing on the specified target.
								Unauthorized testing is illegal and may result in prosecution.
							</p>
							<div className="flex items-start gap-3 pt-2">
								<Checkbox
									id="legal"
									checked={legalAccepted}
									onCheckedChange={() => setLegalAccepted((prev) => !prev)}
									className="mt-1 border-orange-700 data-[state=checked]:bg-orange-600"
								/>
								<label htmlFor="legal" className="text-sm cursor-pointer">
									I have proper authorization and accept full legal
									responsibility for this security assessment
								</label>
							</div>
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			{/* Action Buttons */}
			<div className="flex items-center gap-4 mt-8">
				<Button
					onClick={handleStartScan}
					disabled={!legalAccepted || !target}
					className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-medium px-8 py-5 text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<Play className="w-5 h-5 mr-2" />
					Start Scan
				</Button>
				<Button
					variant="outline"
					onClick={() => navigate("/dashboard")}
					className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-5 rounded-xl"
				>
					Cancel
				</Button>
			</div>
		</main>
	);
}
