export default (parent, args, context, info) => {
	return context.req.user;
};
