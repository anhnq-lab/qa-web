import { useState } from 'react';
import { subscriberService } from '../services/subscriberService';

export function useSubscribe() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const subscribe = async (email: string, name?: string) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            setMessage('');

            const result = await subscriberService.subscribe(email, name);

            if (result.alreadySubscribed) {
                setMessage('Email này đã đăng ký rồi!');
            } else if (result.reactivated) {
                setMessage('Chào mừng bạn quay lại! Đã kích hoạt lại đăng ký.');
            } else {
                setMessage('Đăng ký thành công! Cảm ơn bạn đã quan tâm.');
            }

            setSuccess(true);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Đăng ký thất bại'));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setSuccess(false);
        setMessage('');
    };

    return { subscribe, loading, error, success, message, reset };
}
