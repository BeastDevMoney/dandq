import { useState } from 'react';

export default function DailyInteractionCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleInteraction = async () => {
    setChecked(true);
    try {
      const response = await fetch('/api/dailyInteraction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to record daily interaction');
      }

      // You might want to show a success message to the user here
    } catch (error) {
      console.error('Error recording daily interaction:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleInteraction}
          disabled={checked}
        />
        I'm here today!
      </label>
    </div>
  );
}