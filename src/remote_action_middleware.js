export default function(socket) {
	return function(store) {
		return function(next) {
			return function(action) {
				if (action.meta && action.meta.remote) {
					socket.emit('action', action);
				}

				return next(action);
			}
		}
	}
}
