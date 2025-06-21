'use client';

import * as React from 'react';
import {
  PlusIcon,
  XIcon,
  TagIcon,
  StarIcon,
  FlagIcon,
  BookmarkIcon,
  HeartIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  InfoIcon,
  LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Badge } from './badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Input } from './input';

export type Label = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
};

const AVAILABLE_ICONS = [
  { value: 'tag', label: 'Tag', icon: TagIcon },
  { value: 'star', label: 'Star', icon: StarIcon },
  { value: 'flag', label: 'Flag', icon: FlagIcon },
  { value: 'bookmark', label: 'Bookmark', icon: BookmarkIcon },
  { value: 'heart', label: 'Heart', icon: HeartIcon },
  { value: 'alert', label: 'Alert', icon: AlertCircleIcon },
  { value: 'check', label: 'Check', icon: CheckCircleIcon },
  { value: 'clock', label: 'Clock', icon: ClockIcon },
  { value: 'info', label: 'Info', icon: InfoIcon },
];

const COLORS = [
  { name: 'Default', value: 'bg-primary' },
  { name: 'Secondary', value: 'bg-secondary' },
  { name: 'Destructive', value: 'bg-destructive' },
  { name: 'Project', value: 'bg-projects' },
  { name: 'Area', value: 'bg-areas' },
  { name: 'Resource', value: 'bg-resources' },
  { name: 'Archive', value: 'bg-archives' },
];

type InputLabelsProps = {
  value: Label[];
  onChange: (labels: Label[]) => void;
  availableLabels?: Label[];
  className?: string;
};

export function InputLabels({
  value,
  onChange,
  availableLabels = [],
  className,
}: InputLabelsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState<Partial<Label>>({
    name: '',
    icon: TagIcon,
    color: COLORS[0].value,
  });

  const handleCreateLabel = () => {
    if (!newLabel.name || !newLabel.icon || !newLabel.color) return;

    const label: Label = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLabel.name,
      icon: newLabel.icon,
      color: newLabel.color,
    };

    onChange([...value, label]);
    setNewLabel({
      name: '',
      icon: TagIcon,
      color: COLORS[0].value,
    });
    setIsCreateDialogOpen(false);
  };

  const handleAddExistingLabel = (label: Label) => {
    if (!value.find((l) => l.id === label.id)) {
      onChange([...value, label]);
    }
  };

  const handleRemoveLabel = (labelId: string) => {
    onChange(value.filter((label) => label.id !== labelId));
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((label) => (
          <Badge
            key={label.id}
            variant="secondary"
            className={cn('flex items-center gap-1.5 px-2 py-1', label.color)}
          >
            <label.icon className="size-3.5" />
            <span>{label.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 size-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveLabel(label.id)}
            >
              <XIcon className="size-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Select
          value=""
          onValueChange={(labelId) => {
            const label = availableLabels.find((l) => l.id === labelId);
            if (label) handleAddExistingLabel(label);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select existing label" />
          </SelectTrigger>
          <SelectContent>
            {availableLabels
              .filter((label) => !value.find((l) => l.id === label.id))
              .map((label) => (
                <SelectItem key={label.id} value={label.id}>
                  <div className="flex items-center gap-2">
                    <label.icon className="size-4" />
                    <span>{label.name}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusIcon className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Label</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newLabel.name}
                  onChange={(e) =>
                    setNewLabel((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter label name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Select
                  value={newLabel.icon?.name || 'tag'}
                  onValueChange={(value) => {
                    const icon = AVAILABLE_ICONS.find(
                      (i) => i.value === value,
                    )?.icon;
                    if (icon) {
                      setNewLabel((prev) => ({ ...prev, icon }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {newLabel.icon && <newLabel.icon className="size-4" />}
                        <span>
                          {AVAILABLE_ICONS.find((i) => i.icon === newLabel.icon)
                            ?.label || 'Select icon'}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ICONS.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <div className="flex items-center gap-2">
                          <icon.icon className="size-4" />
                          <span>{icon.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      className={cn(
                        'size-8 rounded-md border transition-colors hover:opacity-80',
                        color.value,
                        newLabel.color === color.value && 'ring-ring ring-2',
                      )}
                      onClick={() =>
                        setNewLabel((prev) => ({ ...prev, color: color.value }))
                      }
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleCreateLabel}
                disabled={!newLabel.name}
              >
                Create Label
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
