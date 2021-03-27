export default {
  reviewStatusLabel(value) {
    switch (value) {
      case "APPROVED":
        return "승인";
      case "PENDING":
        return "대기중";
      case "CHANGE_REQUESTED":
        return "변경요청";
      case "REJECTED":
        return "거부";
      default:
        break;
    }
  },
};
