// useToast.ts
import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { ref } from "vue";
type NotificationType = "success" | "error" | "info" | "warning"; // Replace with your actual NotificationType definition

export default function toastController(
  obj: NotificationApiInjection,
  type: NotificationType,
  title?: string,
  content?: string,
  duration?: number,
  closable?: boolean
) {
  const notification = ref(obj); // Replace with your actual notification object

  const toastController = () => {
    notification.value[type]({
      title: title || "Error",
      duration: duration || 3000,
      closable: closable || false,
      content: content || "",
    });
  };

  return toastController;
}
