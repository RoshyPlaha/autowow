import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RadioGroupSelectionProps {
  dateRanges: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function RadioGroupSelection({ 
  dateRanges, 
  onChange,
  defaultValue = "6 months"
}: RadioGroupSelectionProps) {
  return (
    <RadioGroup onValueChange={onChange} defaultValue={defaultValue}>
      {dateRanges.map((range) => (
        <div key={range} className="flex items-center space-x-2">
          <RadioGroupItem value={range} id={range} />
          <Label htmlFor={range}>{range}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
