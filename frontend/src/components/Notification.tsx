import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Notification {
    id: number;
    message: string;
    type: "success" | "error" | "warning" | "info";
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [enteringNotifications, setEnteringNotifications] = useState<number[]>([]);
    const [visibleNotifications, setVisibleNotifications] = useState<number[]>([]);

    useEffect(() => {
        // @ts-ignore
        window.addNotification = (message: string, type: Notification['type'] = 'info') => {
        const id = Date.now();
        const newNotification: Notification = { id, message, type };
        
        setNotifications(prev => [...prev, newNotification]);
        setEnteringNotifications(prev => [...prev, id]);
        
        setTimeout(() => {
            setEnteringNotifications(prev => prev.filter(nId => nId !== id));
            setVisibleNotifications(prev => [...prev, id]);
        }, 10);
        
        setTimeout(() => {
            handleRemove(id);
        }, 5000);
        };

        return () => {
        // @ts-ignore
        delete window.addNotification;
        };
    }, []);

    const handleRemove = (id: number) => {
        setVisibleNotifications(prev => prev.filter(nId => nId !== id));
        
        setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        setEnteringNotifications(prev => prev.filter(nId => nId !== id));
        }, 300);
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => {
                const isEntering = enteringNotifications.includes(notification.id);
                const isVisible = visibleNotifications.includes(notification.id);
                
                return (
                    <div
                        className={`
                            px-4 py-3 rounded-lg small-shadow flex items-center justify-between min-w-64 max-w-md transition-all duration-300 ease-out transform
                            ${isEntering ? 'translate-y-4 opacity-0 scale-95' : isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
                            ${notification.type === 'success' ? 'bg-green-500 text-white' : notification.type === 'error' ? 'bg-red-500 text-white' : notification.type === 'warning' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}
                        `}
                        key={notification.id}
                    >
                        <span className="font-medium font-montserrat">
                            {notification.message}
                        </span>
                        <button 
                            onClick={() => handleRemove(notification.id)}
                            className="ml-4 hover:opacity-70 transition-opacity cursor-pointer"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}