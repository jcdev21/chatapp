import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HttpSuccess } from '@/lib/handle-http-success';
import { TFetchReturnType } from '@/modules/chat/loader';
import OtherList from '@/modules/chat/other-list';
import RecentList from '@/modules/chat/recent-list';
import { User } from '@/modules/user/types';
import { socket } from '@/utils/socket';
import { Suspense, useEffect } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

export default function Chat() {
	const dataLoader = useLoaderData() as Awaited<TFetchReturnType>;

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	function otherListElements(others: HttpSuccess<User[]>) {
		return <OtherList users={others.data} />;
	}

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
					<RecentList chats={dataLoader.recents.data} />
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
							{otherListElements}
						</Await>
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
}
