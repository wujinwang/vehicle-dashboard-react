import Header from '@/app/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

export default async function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex h-full w-full">
            <div className="flex w-full flex-col">
                <Header />
                <main className="flex-1 p-4 md:p-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Home Page</CardTitle>
                            <CardDescription>
                                This is the backend for the vehicle dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {children}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}