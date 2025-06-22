import Hero from "@/components/common/hero"
import { OpenInV0Button } from "@/components/common/open-in-v0-button"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
	return (
		<>
			<Hero />
			<div className="flex flex-col gap-8 mx-auto px-4 py-8 max-w-3xl min-h-svh">
				<header className="flex flex-col gap-1">
					<h1 className="font-bold text-3xl tracking-tight">Custom Registry</h1>
				</header>
				<main className="flex flex-col flex-1 gap-8">
					<div className="relative flex flex-col gap-4 p-4 border rounded-lg min-h-[450px]">
						<div className="flex justify-between items-center">
							<h2 className="sm:pl-3 text-muted-foreground text-sm">
								A simple hello world component
							</h2>
							<OpenInV0Button name="hello-world" className="w-fit" />
						</div>
						<div className="relative flex justify-center items-center min-h-[400px]">
							<HelloWorld />
						</div>
					</div>

					<div className="relative flex flex-col gap-4 p-4 border rounded-lg min-h-[450px]">
						<div className="flex justify-between items-center">
							<h2 className="sm:pl-3 text-muted-foreground text-sm">
								A contact form with Zod validation.
							</h2>
							<OpenInV0Button name="example-form" className="w-fit" />
						</div>
						<div className="relative flex justify-center items-center min-h-[500px]">
							<ExampleForm />
						</div>
					</div>

					<div className="relative flex flex-col gap-4 p-4 border rounded-lg min-h-[450px]">
						<div className="flex justify-between items-center">
							<h2 className="sm:pl-3 text-muted-foreground text-sm">
								A complex component showing hooks, libs and components.
							</h2>
							<OpenInV0Button name="complex-component" className="w-fit" />
						</div>
						<div className="relative flex justify-center items-center min-h-[400px]">
							<PokemonPage />
						</div>
					</div>

					<div className="relative flex flex-col gap-4 p-4 border rounded-lg min-h-[450px]">
						<div className="flex justify-between items-center">
							<h2 className="sm:pl-3 text-muted-foreground text-sm">
								A login form with a CSS file.
							</h2>
							<OpenInV0Button name="example-with-css" className="w-fit" />
						</div>
						<div className="relative flex justify-center items-center min-h-[400px]">
							<ExampleCard />
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
