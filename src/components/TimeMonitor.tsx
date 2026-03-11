import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const TimeMonitor = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem('ariz_username') || 'Abebe');

  useEffect(() => {
    // Keep username in sync
    const userInterval = setInterval(() => {
       const current = localStorage.getItem('ariz_username') || 'Abebe';
       if (current !== userName) setUserName(current);
    }, 5000);
    return () => clearInterval(userInterval);
  }, [userName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours().toString().padStart(2, '0');
      const currentM = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentH}:${currentM}`;

      // Check Plans (Balegize)
      const plansRaw = localStorage.getItem('ariz_plans');
      if (plansRaw) {
        const plans = JSON.parse(plansRaw);
        let changed = false;
        
        const updatedPlans = plans.map((plan: any) => {
          // Trigger at set time
          if (plan.time === currentTime && !plan.triggered) {
            speak(`Dear ${userName}, your goal is ${plan.text}. Your time is up. Have a good life.`);
            toast.info(`Time for your goal: ${plan.text}`, { 
              duration: 10000,
              icon: '🎯'
            });
            changed = true;
            return { ...plan, triggered: true, triggeredAt: Date.now() };
          }
          
          // 30 mins after trigger check
          if (plan.triggeredAt && !plan.prompted) {
            const thirtyMins = 30 * 60 * 1000;
            if (Date.now() - plan.triggeredAt >= thirtyMins) {
               toast(`Did your plan "${plan.text}" succeed?`, {
                  duration: Infinity,
                  action: {
                    label: 'Yes ✅',
                    onClick: () => markPlan(plan.id, true)
                  },
                  cancel: {
                    label: 'No ❌',
                    onClick: () => markPlan(plan.id, false)
                  }
               });
               changed = true;
               return { ...plan, prompted: true };
            }
          }
          return plan;
        });

        if (changed) {
          localStorage.setItem('ariz_plans', JSON.stringify(updatedPlans));
          window.dispatchEvent(new Event('storage'));
        }
      }

      // Check Meds (Ayizony)
      const medsRaw = localStorage.getItem('ariz_meds');
      if (medsRaw) {
        const meds = JSON.parse(medsRaw);
        let changedMed = false;
        
        const updatedMeds = meds.map((med: any) => {
          if (med.time === currentTime && !med.triggered) {
            speak(`Dear ${userName}, it's time for your medication ${med.name}. Please take it. I wish you well. May God heal you.`);
            toast.success(`💊 Time for medication: ${med.name}`, { 
              duration: 15000,
              description: "I wish you well. May God heal you."
            });
            changedMed = true;
            return { ...med, triggered: true };
          }
          return med;
        });

        if (changedMed) {
          localStorage.setItem('ariz_meds', JSON.stringify(updatedMeds));
          window.dispatchEvent(new Event('storage'));
        }
      }

    }, 15000); // Check every 15 seconds for better accuracy

    return () => clearInterval(interval);
  }, [userName]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.0;
      
      // Some browsers require interaction, but we try anyway
      // Toasting usually helps the user interact if they haven't
      window.speechSynthesis.speak(utterance);
    }
  };

  const markPlan = (id: string, success: boolean) => {
     const plans = JSON.parse(localStorage.getItem('ariz_plans') || '[]');
     const updated = plans.map((p: any) => {
       if (p.id === id) {
         if (success) {
           const currentStreak = Number(localStorage.getItem('ariz_streak') || 0);
           localStorage.setItem('ariz_streak', (currentStreak + 1).toString());
         }
         return { ...p, completed: success, failed: !success, prompted: true };
       }
       return p;
     });
     localStorage.setItem('ariz_plans', JSON.stringify(updated));
     window.dispatchEvent(new Event('storage'));
  };

  return null;
};