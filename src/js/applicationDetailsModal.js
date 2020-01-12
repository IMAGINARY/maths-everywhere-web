export default class ApplicationDetailsModal {
  constructor() {
    this.visible = false;
    this.$titleContainer = $('<div class="modal-title">');
    this.$bodyImage = $('<img class="modal-body-image img-fluid mb-4">');
    this.$bodyText = $('<div class="modal-body-text">');
    this.$bodyLinks = $('<div class="modal-body-links">');

    this.$bodyContainer = $('<div class="modal-body">')
      .append($('<div class="container-fluid">')
        .append($('<div class="row">')
          .append($('<div class="col">')
            .append(this.$bodyImage))
          .append($('<div class="col">')
            .append(this.$bodyText)))
        .append($('<div class="row">')
          .append($('<div class="col">')
            .append(this.$bodyLinks))));

    this.$modal = $('<div class="modal fade">')
      .append($('<div class="modal-dialog modal-lg">')
        .append($('<div class="modal-content">')
          .append($('<div class="modal-header">')
            .append(this.$titleContainer)
            .append($('<button type="button" class="close" data-dismiss="modal">')
              .append($('<span>').html('&times;'))))
          .append(this.$bodyContainer)));

    this.$modal.on('hidden.bs.modal', () => {
      this.visible = false;
    });

    this.$modal.on('shown.bs.modal', () => {
      this.visible = true;
    });
  }

  show(application) {
    this.$titleContainer.html(application.title);
    this.$bodyImage.attr('src', `assets/img/applications/${application.id}.jpg`);
    this.$bodyText.html(application.body);
    this.$bodyLinks.empty();
    if (application.links) {
      const links = application.links.split('\n').map(each => $('<a>')
        .attr('href', each)
        .attr('target', '_blank')
        .text(each));
      this.$bodyLinks.append(links);
    }

    if (!this.visible) {
      this.$modal.modal('show');
    } else {
      this.$modal.modal('handleUpdate');
    }
  }

  hide() {
    this.$modal.modal('hide');
  }
}
