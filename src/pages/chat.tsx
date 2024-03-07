import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TFetchReturnType } from '@/modules/chat/loader';
import OtherList from '@/modules/chat/other-list';
import RecentList from '@/modules/chat/recent-list';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

export default function Chat() {
	const dataLoader = useLoaderData() as Awaited<TFetchReturnType>;
	console.log(dataLoader);

	return (
		<div className="w-96 h-[calc(100vh-4rem)] bg-white overflow-hidden">
			<Tabs defaultValue="recent" className="w-full">
				<TabsList className="w-full rounded-none h-auto bg-transparent p-0">
					<TabsTrigger
						value="recent"
						className="w-full pl-0 pr-6 py-5 rounded-none border-b-2 border-slate-100 data-[state=active]:border-primary"
					>
						Recent
					</TabsTrigger>
					<TabsTrigger
						value="other"
						className="w-full pl-0 pr-6 py-5 rounded-none border-b-2 border-slate-100 data-[state=active]:border-primary"
					>
						Other
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="recent"
					className="relative overflow-auto h-[calc(100vh-9rem)] px-4"
				>
					<RecentList />
				</TabsContent>
				<TabsContent
					value="other"
					className="relative overflow-auto h-[calc(100vh-9rem)] px-4"
				>
					<Suspense fallback={<div>Loading...</div>}>
						<Await
							resolve={dataLoader.others}
							errorElement={
								<p>Error loading package location!</p>
							}
						>
							<OtherList />
						</Await>
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
