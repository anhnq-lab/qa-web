import { useState } from 'react';
import { leadService } from '../services/leadService';
import type { InsertTables } from '../types/database';

type LeadInput = InsertTables<'leads'>;

export function useSubmitLead() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState(false);

    const submitLead = async (lead: LeadInput) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            await leadService.submitLead(lead);
            setSuccess(true);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to submit'));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setSuccess(false);
    };

    return { submitLead, loading, error, success, reset };
}
